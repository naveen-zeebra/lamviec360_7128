///////////////////////////////////////////////////////////////////////////////
// Jenkinsfile — LamViec360 Job Seeker Landing
// Next.js CI/CD Pipeline
//
// GitHub:
// https://github.com/naveen-zeebra/lamviec360_7128
//
// Docker Hub:
// naveenkumar1137/jobseeker-landing
//
// Deployment:
// Server: 103.175.146.37
// User: deploy
// Port: 4028
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

        // ---------------------------------------------------------------------
        // Docker
        // ---------------------------------------------------------------------

        DOCKER_REGISTRY = 'docker.io'

        DOCKER_REPO = 'naveenkumar1137/jobseeker-landing'

        IMAGE_TAG = "${BUILD_NUMBER}"

        IMAGE_FULL = "${DOCKER_REGISTRY}/${DOCKER_REPO}:${BUILD_NUMBER}"

        IMAGE_LATEST = "${DOCKER_REGISTRY}/${DOCKER_REPO}:latest"

        // Jenkins Docker Hub credential
        DOCKER_CREDENTIALS = 'dockerhub-credentials'


        // ---------------------------------------------------------------------
        // Remote Deployment
        // ---------------------------------------------------------------------

        DEPLOY_HOST = '103.175.146.37'

        DEPLOY_USER = 'deploy'

        SSH_CREDENTIALS = 'ssh-dev-server'

        REMOTE_PROJECT_DIR = '/opt/jobseeker-landing'


        // ---------------------------------------------------------------------
        // Application
        // ---------------------------------------------------------------------

        APP_PORT = '4028'

        CONTAINER_NAME = 'lv360_jobseeker_landing'
    }


    stages {

        // =====================================================================
        // 1. CHECKOUT
        // =====================================================================

        stage('Checkout') {

            steps {

                checkout scm

                script {

                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    env.GIT_BRANCH_NAME = sh(
                        script: 'git rev-parse --abbrev-ref HEAD',
                        returnStdout: true
                    ).trim()

                    echo "=============================================="
                    echo "Job Seeker Landing"
                    echo "Commit : ${env.GIT_COMMIT_SHORT}"
                    echo "Branch : ${env.GIT_BRANCH_NAME}"
                    echo "=============================================="
                }
            }
        }


        // =====================================================================
        // 2. VERIFY PROJECT FILES
        // =====================================================================

        stage('Verify Project') {

            steps {

                sh '''
                    echo "=============================================="
                    echo "PROJECT FILES"
                    echo "=============================================="

                    pwd

                    echo ""
                    echo "package.json:"
                    ls -lh package.json

                    echo ""
                    echo "package-lock.json:"
                    ls -lh package-lock.json

                    echo ""
                    echo "Next.js configuration:"
                    ls -lh next.config.* 2>/dev/null || true

                    echo ""
                    echo "Project structure:"
                    ls -la
                '''
            }
        }


        // =====================================================================
        // 3. INSTALL DEPENDENCIES
        // =====================================================================

        stage('Install Dependencies') {

            steps {

                sh '''
                    echo "=============================================="
                    echo "INSTALL DEPENDENCIES"
                    echo "=============================================="

                    docker build \
                        --no-cache \
                        -f - \
                        -t jobseeker-node:${BUILD_NUMBER} . <<'DOCKERFILE'

FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN echo "========================================" && \
    echo "Node version" && \
    node --version && \
    echo "NPM version" && \
    npm --version && \
    echo "========================================"

RUN echo "Checking @swc/helpers in lockfile..." && \
    grep -n '"@swc/helpers"' package-lock.json || true

RUN npm ci --prefer-offline --no-audit

DOCKERFILE

                    echo ""
                    echo "Dependency installation successful."
                '''
            }
        }


        // =====================================================================
        // 4. LINT
        // =====================================================================

        stage('Lint') {

            steps {

                sh '''
                    echo "=============================================="
                    echo "LINT"
                    echo "=============================================="

                    docker run --rm \
                        jobseeker-node:${BUILD_NUMBER} \
                        npm run lint

                    echo ""
                    echo "Lint successful."
                '''
            }
        }


        // =====================================================================
        // 5. NEXT.JS BUILD
        // =====================================================================

        stage('Build') {

            steps {

                sh '''
                    echo "=============================================="
                    echo "NEXT.JS BUILD"
                    echo "=============================================="

                    docker run --rm \
                        jobseeker-node:${BUILD_NUMBER} \
                        sh -c "npm run build"

                    echo ""
                    echo "Next.js build successful."
                '''
            }
        }


        // =====================================================================
        // 6. DOCKER APPLICATION BUILD
        // =====================================================================

        stage('Docker Build') {

            steps {

                sh '''
                    echo "=============================================="
                    echo "DOCKER APPLICATION BUILD"
                    echo "=============================================="

                    docker build \
                        --pull \
                        -t ${IMAGE_FULL} \
                        -t ${IMAGE_LATEST} \
                        .

                    echo ""
                    echo "Docker image created:"
                    echo "${IMAGE_FULL}"
                    echo "${IMAGE_LATEST}"
                '''
            }
        }


        // =====================================================================
        // 7. DOCKER IMAGE CHECK
        // =====================================================================

        stage('Docker Image Check') {

            steps {

                sh '''
                    echo "=============================================="
                    echo "DOCKER IMAGE CHECK"
                    echo "=============================================="

                    docker image inspect ${IMAGE_FULL} > /dev/null

                    echo ""
                    echo "Image exists successfully."

                    docker images \
                        ${DOCKER_REPO} \
                        --format "table {{.Repository}}\\t{{.Tag}}\\t{{.Size}}"
                '''
            }
        }


        // =====================================================================
        // 8. DOCKER HUB PUSH
        // =====================================================================

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
                        echo "=============================================="
                        echo "DOCKER HUB PUSH"
                        echo "=============================================="

                        echo "$DOCKER_PASS" | docker login \
                            ${DOCKER_REGISTRY} \
                            -u "$DOCKER_USER" \
                            --password-stdin

                        echo ""
                        echo "Pushing build image..."

                        docker push ${IMAGE_FULL}

                        echo ""
                        echo "Pushing latest image..."

                        docker push ${IMAGE_LATEST}

                        echo ""
                        echo "Docker Hub push successful."

                        docker logout ${DOCKER_REGISTRY}
                    '''
                }
            }
        }


        // =====================================================================
        // 9. DEPLOY
        // =====================================================================

        stage('Deploy') {

            steps {

                sshagent(credentials: [env.SSH_CREDENTIALS]) {

                    sh '''
                        echo "=============================================="
                        echo "REMOTE DEPLOYMENT"
                        echo "=============================================="

                        echo "Server : ${DEPLOY_HOST}"
                        echo "User   : ${DEPLOY_USER}"
                        echo "Port   : ${APP_PORT}"
                        echo "Image  : ${IMAGE_FULL}"

                        ssh \
                            -o StrictHostKeyChecking=no \
                            ${DEPLOY_USER}@${DEPLOY_HOST} << ENDSSH

                            set -e

                            echo "=========================================="
                            echo "Preparing deployment directory"
                            echo "=========================================="

                            mkdir -p ${REMOTE_PROJECT_DIR}

                            cd ${REMOTE_PROJECT_DIR}

                            echo ""
                            echo "Pulling Docker image..."

                            docker pull ${IMAGE_FULL}

                            echo ""
                            echo "Updating deployment image tag..."

                            export DOCKER_IMAGE_TAG=${BUILD_NUMBER}

                            echo ""
                            echo "Docker image:"
                            echo "${DOCKER_REPO}:\${DOCKER_IMAGE_TAG}"

                            echo ""
                            echo "Starting Job Seeker Landing..."

                            docker compose up -d --force-recreate

                            echo ""
                            echo "Container status:"

                            docker ps \
                                --filter "name=${CONTAINER_NAME}"

                            echo ""
                            echo "Deployment started successfully."

ENDSSH
                    '''
                }
            }
        }


        // =====================================================================
        // 10. HEALTH CHECK
        // =====================================================================

        stage('Health Check') {

            steps {

                sshagent(credentials: [env.SSH_CREDENTIALS]) {

                    sh '''
                        echo "=============================================="
                        echo "HEALTH CHECK"
                        echo "=============================================="

                        ssh \
                            -o StrictHostKeyChecking=no \
                            ${DEPLOY_USER}@${DEPLOY_HOST} << ENDSSH

                            set -e

                            echo "Waiting for application to start..."

                            sleep 10

                            echo ""
                            echo "Container status:"

                            docker ps \
                                --filter "name=${CONTAINER_NAME}"

                            echo ""
                            echo "Application health check..."

                            curl \
                                --fail \
                                --silent \
                                --show-error \
                                http://localhost:${APP_PORT}/ \
                                > /dev/null

                            echo ""
                            echo "=========================================="
                            echo "HEALTH CHECK PASSED"
                            echo "=========================================="

ENDSSH
                    '''
                }
            }
        }
    }


    // =========================================================================
    // POST ACTIONS
    // =========================================================================

    post {

        success {

            echo """
==============================================
JOB SEEKER LANDING CI/CD SUCCESS
==============================================

Commit       : ${env.GIT_COMMIT_SHORT}
Docker Image : ${IMAGE_FULL}
Latest Image : ${IMAGE_LATEST}
Server       : ${DEPLOY_HOST}
Port         : ${APP_PORT}
Container    : ${CONTAINER_NAME}

Deployment successful.
==============================================
"""
        }


        failure {

            echo """
==============================================
JOB SEEKER LANDING CI/CD FAILED
==============================================

Commit : ${env.GIT_COMMIT_SHORT ?: 'unknown'}
Stage  : ${env.STAGE_NAME ?: 'unknown'}

Please check the failed stage above.
==============================================
"""
        }


        cleanup {

            sh '''
                echo "=============================================="
                echo "CLEANUP"
                echo "=============================================="

                docker rmi ${IMAGE_FULL} 2>/dev/null || true

                docker rmi ${IMAGE_LATEST} 2>/dev/null || true

                docker rmi jobseeker-node:${BUILD_NUMBER} 2>/dev/null || true

                echo "Cleanup completed."
            '''
        }
    }
}