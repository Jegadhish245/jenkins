// Jenkinsfile
// Defines a declarative pipeline for a Node.js application
pipeline {
    // Run the pipeline on any available agent
    agent any

    // Define environment variables
    environment {
        // Tag the image with the build number and Docker Hub details
        DOCKER_IMAGE_NAME = "jegadhish24/node-app"
        BUILD_TAG = "${env.BUILD_NUMBER}"
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE_NAME}:${BUILD_TAG}"
        // ID of your Jenkins credentials for Docker Hub
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
                withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        script {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push $DOCKER_IMAGE_TAG"
                        sh "docker logout"  
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





