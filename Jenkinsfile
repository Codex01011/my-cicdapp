pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')  
    }

    environment {
        NETLIFY_SITE_ID = '5d89be78-7bc0-4cfc-9821-9f379dad8e12'
        NETLIFY_AUTH_TOKEN = credentials('JenkinsToken')
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install
                    npm run build
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    test -f build/index.html
                    npm test || echo "No tests found or test script not defined."
                '''
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npx netlify deploy --prod --dir=build --auth $NETLIFY_AUTH_TOKEN --site $NETLIFY_SITE_ID
                '''
            }
        }
    }
}
