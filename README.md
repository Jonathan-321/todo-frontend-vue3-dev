# Student List Frontend with Vue 3

This application allows users to create and maintain a list of students. Please visit https://github.com/OC-ComputerScience/student-backend for the backend repository.

### Table of Contents
[Project Setup for your Local Machine](#project-setup-for-your-local-machine)</br>
[Project Setup for your AWS Instance](#project-setup-for-your-aws-instance)

## Project Setup for your Local Machine

1. Clone the project into your **XAMPP/xamppfiles/htdocs/studentapp** directory.
```
git clone https://github.com/OC-ComputerScience/student-frontend-vue3.git
```

2. Make sure **Apache** and **MySQL** are running.
    - We recommend using XAMPP to serve this project.
    - In XAMPP, make sure that **Apache** and **MySQL** are running.

3. Make sure you have finished installing the [Student Backend](https://github.com/OC-ComputerScience/student-backend) on your local machine.

4. Compile and run the project locally.
```
npm run dev
```

5. Test the project.
    - http://localhost:8081
    - You should see the project running with data on your screen.

## Project Setup for your AWS Instance
1. Compile the project for production.
```
npm run build
```

2. Open **Filezilla** and navigate to **var/www/html/** on your AWS instance.

3. Make a directory for this project called **student-frontend-vue3**.

4. Copy **XAMPP/htdocs/studentapp/student-frontend-vue3/dist** to **var/www/html/student-frontend-vue3**.

5. Make sure that you have finished installing the [Student Backend](https://github.com/OC-ComputerScience/student-backend) on your AWS instance.

6. Test the project.
    - http://**your instance**/student-frontend-vue3/
    - You should see the project running with data on your screen.

