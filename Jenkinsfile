pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
    }

    environment {
        DOCKER_IMAGE = 'naveenkumar1137/jobseeker-landing'
        DOCKER_CREDENTIALS = 'dockerhub-credentials'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }

            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }

        stage('Lint') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }

            steps {
                sh '''
                    npm run lint
                '''
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }

            steps {
                sh '''
                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                        -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                        -t ${DOCKER_IMAGE}:latest \
                        .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKER_CREDENTIALS}",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" \
                            --password-stdin

                        docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                        docker push ${DOCKER_IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL'
        }

        failure {
            echo 'BUILD FAILED'
        }

        cleanup {
            sh '''
                docker rmi ${DOCKER_IMAGE}:${BUILD_NUMBER} || true
                docker rmi ${DOCKER_IMAGE}:latest || true
            '''
        }
    }
}