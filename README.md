\# 🤖 AI Interview Platform



An AI-powered interview preparation platform that helps students practice technical interviews, take mock interviews, track their performance, and receive personalized AI-generated feedback.



\## 🚀 Features



\* 🔐 User Registration \& Login

\* 🎯 Practice Sessions

\* 🤖 AI-generated Interview Questions using Google Gemini

\* 🎤 Mock Interview with Timer

\* 📊 Score \& Performance Tracking

\* 🏆 Leaderboard

\* 📈 Test History

\* 👤 User Profile

\* 💡 AI-generated Performance Feedback

\* 🏢 Company-specific Interview Preparation

\* 💼 Role-based Interview Questions

\* ⚡ Multiple Difficulty Levels



\## 🛠️ Tech Stack



\### Frontend



\* React.js

\* JavaScript

\* HTML

\* CSS

\* Vite



\### Backend



\* Java

\* Spring Boot

\* Spring Data JPA

\* REST APIs

\* Maven



\### Database



\* MySQL

\* MySQL Workbench



\### AI



\* Google Gemini API



\## 🏗️ Project Structure



```text

AI\_Interview\_Platform/

│

├── backend/

│   ├── src/

│   │   └── main/

│   │       ├── java/

│   │       │   └── com/interview/platform/

│   │       │       ├── controller/

│   │       │       ├── model/

│   │       │       ├── repository/

│   │       │       └── service/

│   │       └── resources/

│   │

│   └── pom.xml

│

├── frontend/

│   ├── src/

│   │   ├── App.jsx

│   │   ├── App.css

│   │   └── main.jsx

│   ├── public/

│   ├── package.json

│   └── vite.config.js

│

├── .gitignore

└── README.md

```



\## 🤖 AI Interview Generation



The platform uses Google Gemini to dynamically generate interview questions based on:



\* Company

\* Job Role

\* Difficulty Level

\* Number of Questions



Example:



```text

Company: Amazon

Role: Software Engineer

Difficulty: Easy

Questions: 10

```



Gemini generates multiple-choice questions with four options and one correct answer.



\## 📊 Performance Tracking



After completing a test, the platform records:



\* Total Questions

\* Correct Answers

\* Score

\* XP Earned

\* Test History



Users can view their progress through the dashboard, profile, history, and leaderboard.



\## 🗄️ Database



The application uses MySQL with the following main tables:



\* `users`

\* `questions`

\* `interview\_tests`

\* `leaderboard`



\## ⚙️ Running the Project Locally



\### 1. Clone the repository



```bash

git clone https://github.com/atejaswini4/AI-Interview-Platform.git

cd AI-Interview-Platform

```



\### 2. Configure Gemini API Key



Set your Gemini API key as an environment variable.



Windows PowerShell:



```powershell

$env:GEMINI\_API\_KEY="YOUR\_API\_KEY"

```



Do not commit your API key to GitHub.



\### 3. Start the Backend



Open a terminal:



```powershell

cd backend

mvn spring-boot:run

```



The backend runs on:



```text

http://localhost:8080

```



\### 4. Start the Frontend



Open another terminal:



```powershell

cd frontend

npm install

npm run dev

```



The frontend will run on the Vite development server, typically:



```text

http://localhost:5173

```



\## 🔒 Security



API keys and environment variables are excluded from Git using `.gitignore`.



Never add your Gemini API key directly to the source code.



\## 🔮 Future Improvements



\* Voice-based interviews

\* Speech-to-text answers

\* Resume-based interview generation

\* More advanced AI evaluation

\* Interview difficulty adaptation

\* Deployment to cloud platforms

\* Email-based performance reports



\## 👩‍💻 Author



\*\*Tejaswini Allam\*\*



B.Tech – Artificial Intelligence \& Machine Learning



Shri Vishnu Engineering College for Women



