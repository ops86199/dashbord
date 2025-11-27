pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'your-dockerhub-username'
    DOCKERHUB_PASS = 'your-dockerhub-password' // For security, store in Jenkins credentials instead!
    IMAGE_REPO = 'your-dockerhub-username/dashboard-app'
    IMAGE_TAG = "v0.1."
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${IMAGE_REPO}:${IMAGE_TAG}")
        }
      }
    }
    stage('Login to Docker Hub') {
      steps {
        script {
          sh "echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin"
        }
      }
    }
    stage('Push to Docker Hub') {
      steps {
        script {
          dockerImage.push()
        }
      }
    }
    stage('Cleanup local images') {
      steps {
        script {
          sh "docker rmi ${IMAGE_REPO}:${IMAGE_TAG} || true"
        }
      }
    }
  }
}