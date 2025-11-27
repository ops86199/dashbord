pipeline {
  agent any

  environment {
    DOCKER_USER = "your-dockerhub-username"
    IMAGE_REPO = "ops86199/dashboard-app"
    IMAGE_TAG = "v0.1"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "
        docker rmi -f your-dockerhub-username/dashboard-app:v0.1|| true
        docker build -t ${IMAGE_REPO}:${IMAGE_TAG} ."
      }
    }

    stage('Login to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub',     // 👈 your real credential
          usernameVariable: 'USER',
          passwordVariable: 'PASS'
        )]) {
          sh "echo $PASS | docker login -u $USER --password-stdin"
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        sh "docker push ${IMAGE_REPO}:${IMAGE_TAG}"
      }
    }

    stage('Cleanup local images') {
      steps {
        sh "docker rmi ${IMAGE_REPO}:${IMAGE_TAG} || true"
      }
    }

  }
}
