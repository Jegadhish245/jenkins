// Jenkinsfile
// Defines a declarative pipeline for a Node.js application
pipeline {
    // Run the pipeline on any available agent
    agent any

    // Define environment variables
    environment {
        // Tag the image with the build number and Docker Hub details
        DOCKER_IMAGE_NAME = "your-dockerhub-username/node-app"
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
        // ID of your Jenkins credentials for Docker Hub
        DOCKERHUB_CREDENTIALS_ID = "docker-hub-crds"
    }

    // Define the stages of the pipeline
    stages {
        stage('Checkout') {
            steps {
                // Check out the code from the Git repository
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE_TAG} ."
                }
            }
        }

        stage('Test') {
            steps {
                // Run tests inside the container
                script {
                    sh "docker run --rm ${DOCKER_IMAGE_TAG} npm test"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                // Push the image to Docker Hub using stored credentials
                script {
                    docker.withRegistry('https://hub.docker.com/repositories/jegadhish24', env.DOCKERHUB_CREDENTIALS_ID) {
                        sh "docker push ${DOCKER_IMAGE_TAG}"
                    }
                }
            }
        }
        
        stage('Clean up') {
            steps {
                // Clean up the local Docker image to save disk space
                script {
                    sh "docker rmi ${DOCKER_IMAGE_TAG}"
                }
            }
        }
    }
}
