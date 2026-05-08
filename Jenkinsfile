node {
     stage('Checkout SCM') {
        git branch: 'main', url: 'https://github.com/your-repo/erp-client.git'
    }

    stage('Build') {
        bat 'npm install'
        bat 'npm run build --prod'
    }

    stage('Copy') {
        bat 'xcopy /E /I /Y dist\\* G:\\Personal\\Perso\\CodeLibrary\\Projects\\admin-login\\PUBLISHED\\coreapp-ui'
    }
}