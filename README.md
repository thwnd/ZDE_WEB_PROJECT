Overview
This calendar application helps users manage their schedules, keep track of important dates, and set reminders. It aims to enhance user experience through an intuitive interface and a variety of features.

Key Features
Add and Manage Events: Easily add, modify, and delete events.
Event Reminders: Set reminders to ensure you don't miss important events.
Month/Week/Day View: View your schedule by month, week, or day.
Recurring Events: Set up events that repeat on a regular basis.
Multi-User Support: Multiple users can manage their individual schedules.
Customizable Themes: Change the theme to suit your preferences.
Installation
Clone the Repository: First, clone the GitHub repository to your local machine.

git clone https://github.com/username/calendar-app.git
Navigate to Directory: Move to the cloned directory.

cd calendar-app
Install Dependencies: Install the necessary libraries and packages.

npm install
Run the Application: Start the application.

npm start
Usage
Sign Up and Log In: Register for an account or log in with an existing account.
Add Event: Click on the "Add New Event" button and fill in the required information.
View Events: Select the month, week, or day view from the top menu to see your schedule.
Set Reminders: Set reminder times when adding an event.
Change Theme: Go to the settings menu to change the theme.
Contribution
Fork the Repository: Fork the repository and clone it to your local machine.
Create a New Branch: Create a new branch for your feature or bug fix.

git checkout -b feature/new-feature
Commit Changes: Commit your changes.

git commit -m 'Add new feature'
Push Changes: Push your changes to the remote repository.

git push origin feature/new-feature
Create a Pull Request: Open a pull request on GitHub.
License
This project is licensed under the MIT License. For more details, see the LICENSE file.

Contact
For any questions or issues, please contact us at support@calendarapp.com.

1. 데이터 베이스 통해서 로그인 완성(sns인증은 아직 보류)

2. 각각의 아이디로 다른 일정 사용할수 있게 지정(일정 공유기능은 보류)


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    start_date DATE,
    end_date DATE,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

db 생성 테이블
