pipeline {
    agent {
        docker {
            image 'node'
        }
    }
    stages {
        stage('Build') {
            steps {
                echo 'CI Build'
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                echo 'CI Test'
                sh 'npm test'
            }
        }
    }
    stage('Test') {
      steps {
        echo 'CI Test'
        sh 'npm test'
      }
    }
  }
}
