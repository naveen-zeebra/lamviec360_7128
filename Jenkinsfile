///////////////////////////////////////////////////////////////////////////////
// Jenkinsfile — LamViec360 Job Seeker Landing
// Next.js CI/CD Pipeline
///////////////////////////////////////////////////////////////////////////////

pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
    }

    environment {
        DOCKER_REGISTRY   = 'docker.io'
        DOCKER_REPO       = 'naveenkumar1137/jobseeker-landing'

        IMAGE_TAG         = "${BUILD_NUMBER}"
        IMAGE_FULL        = "${DOCKER_REGISTRY}/${DOCKER_REPO}:${BUILD_NUMBER}"
        IMAGE_LATEST      = "${DOCKER_REGISTRY}/${DOCKER_REPO}:latest"

        DOCKER_CREDENTIALS = 'dockerhub-credentials'

        DEPLOY_HOST        = '103.175.146.37'
        SSH_CREDENTIALS    = 'ssh-dev-server'

        REMOTE_PROJECT_DIR = '/opt/jobseeker-landing'
    }

    stages {

        // ---------------------------------------------------------------------
        // Stage 1: Checkout
        // ---------------------------------------------------------------------
        stage('Checkout') {
            steps {
                checkout scm

                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Building commit ${env.GIT_COMMIT_SHORT}"
                }
            }
        }

        // ---------------------------------------------------------------------
        // Stage 2: Install Dependencies
        // ---------------------------------------------------------------------
        stage('Install Dependencies') {
            steps {
                sh '''
                    docker build \
                        -f - \
                        -t jobseeker-node:${BUILD_NUMBER} . <<'DOCKERFILE'

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --prefer-offline --no-audit

COPY . .

DOCKERFILE

                    docker run --rm \
                        jobseeker-node:${BUILD_NUMBER} \
                        node --version

                    docker run --rm \
                        jobseeker-node:${BUILD_NUMBER} \
                        npm --version
                '''
            }
        }

        // ---------------------------------------------------------------------
        // Stage 3: Lint
        // ---------------------------------------------------------------------
        stage('Lint') {
            steps {
                sh '''
                    docker run --rm \
                        jobseeker-node:${BUILD_NUMBER} \
                        npm run lint
                '''
            }
        }

        // ---------------------------------------------------------------------
        // Stage 4: Build
        // ---------------------------------------------------------------------
        stage('Build') {
            steps {
                sh '''
                    docker run --rm \
                        jobseeker-node:${BUILD_NUMBER} \
                        npm run build
                '''
            }
        }

        // ---------------------------------------------------------------------
        // Stage 5: Docker Build
        // ---------------------------------------------------------------------
        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                        -t ${IMAGE_FULL} \
                        -t ${IMAGE_LATEST} \
                        .
                '''
            }
        }

        // ---------------------------------------------------------------------
        // Stage 6: Docker Push
        // ---------------------------------------------------------------------
        stage('Docker Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: env.DOCKER_CREDENTIALS,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                            ${DOCKER_REGISTRY} \
                            -u "$DOCKER_USER" \
                            --password-stdin

                        docker push ${IMAGE_FULL}
                        docker push ${IMAGE_LATEST}

                        docker logout ${DOCKER_REGISTRY}
                    '''
                }
            }
        }

        // ---------------------------------------------------------------------
        // Stage 7: Deploy
        // ---------------------------------------------------------------------
        stage('Deploy') {
            steps {
                sshagent(credentials: [env.SSH_CREDENTIALS]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no \
                            deploy@${DEPLOY_HOST} << 'ENDSSH'

                            set -e

                            echo "Starting Job Seeker Landing deployment..."

                            mkdir -p ${REMOTE_PROJECT_DIR}

                            cd ${REMOTE_PROJECT_DIR}

                            echo "Pulling Docker image..."

                            docker pull ${IMAGE_FULL}

                            echo "Starting container..."

                            docker compose up -d --force-recreate

                            echo "Deployment completed."

ENDSSH
                    '''
                }
            }
        }

        // ---------------------------------------------------------------------
        // Stage 8: Health Check
        // ---------------------------------------------------------------------
        stage('Health Check') {
            steps {
                sshagent(credentials: [env.SSH_CREDENTIALS]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no \
                            deploy@${DEPLOY_HOST} << 'ENDSSH'

                            set -e

                            echo "Waiting for application..."

                            sleep 10

                            echo "Checking container..."

                            docker ps \
                                --filter "name=lv360_jobseeker_landing"

                            echo "Checking application..."

                            curl -f http://localhost:4028/ || exit 1

                            echo "Job Seeker Landing health check PASSED."

ENDSSH
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "=============================================="
            echo "JOB SEEKER LANDING DEPLOYMENT SUCCESS"
            echo "Image: ${IMAGE_FULL}"
            echo "Server: ${DEPLOY_HOST}"
            echo "Port: 4028"
            echo "=============================================="
        }

        failure {
            echo "=============================================="
            echo "JOB SEEKER LANDING PIPELINE FAILED"
            echo "=============================================="
        }

        cleanup {
            sh '''
                docker rmi ${IMAGE_FULL} 2>/dev/null || true
                docker rmi ${IMAGE_LATEST} 2>/dev/null || true
                docker rmi jobseeker-node:${BUILD_NUMBER} 2>/dev/null || true
            '''
        }
    }
}