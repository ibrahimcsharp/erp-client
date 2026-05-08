node {
     stage('Checkout SCM') {
        git branch: 'main', url: 'https://github.com/ibrahimcsharp/erp-client.git'
     }

    stage('Check') {
        steps {
            bat 'dir node_modules\\@angular\\cli'
        }
    }

    stage('Install node modules') {
        bat 'if exist node_modules rmdir /s /q node_modules'
        bat 'npm install'
    }

    stage('Build') {
        bat 'npm run build-prod'
    }

    stage('Copy') {
        bat 'xcopy /E /I /Y dist\\* G:\\Personal\\Perso\\CodeLibrary\\Projects\\admin-login\\PUBLISHED\\coreapp-ui'
    }
}
