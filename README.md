Student Database System

**Overview**
The Student Database System is a web-based application designed to efficiently manage student details. It provides an organized interface for handling student information and allows for easy Create, Read, Update, and Delete (CRUD) operations on student data, offering a simple, user-friendly way to maintain records.

**Table of Contents**
1. [Functional Requirements](#functional-requirements)
2. [Technical Specifications](#technical-specifications)
3. [Setup and Installation](#setup-and-installation)
4. [Usage](#usage)
5. [Contributors](#contributors)
6. [License](#license)


## **1. Functional Requirements**

1.1 User Interface
 **Form-based Input**: A user-friendly form for inputting student details, including fields for student ID, name, age, and grade.
 **Table-based Display**: A clear and organized table to display the list of all student records.
 **Buttons for CRUD Operations**: Easy-to-use buttons to add, edit, delete, and view student records.

1.2 CRUD Operations
 **Create**: Users can add new student records with essential details such as ID, name, age, and grade.
 **Read**: View all student records in a structured table or search for specific students by ID or name.
 **Update**: Edit existing student information either directly in the table or via a form.
 **Delete**: Remove student records with a confirmation prompt to avoid accidental deletion.

1.3 Data Storage
 **Real-Time Firebase**: Student data will be saved in the browser using Real-Time Firebase storage system  

1.4 Data Validation
 **Field Validation**: Ensure that the input fields are valid.
 **Duplicate Check**: Prevent the creation of records with duplicate student IDs.

1.5 Error Handling
 **Graceful Error Handling**: Provide clear error messages for invalid inputs and ensure that invalid operations (such as editing or deleting a non-existent record) are handled safely and informatively.

1.6 Additional Features
 **Sorting and Filtering**: Allow users to sort and filter the student records table by various fields such as name, age, and grade.
 **Data Export**: Export the student data as a JSON or CSV file for further use.

## **2. Technical Specifications**

### 2.1 Tech Stack
 **Frontend**: 
   **HTML**: Markup language used for structuring the application.
   **CSS**: Styling language for a responsive and clean UI.
   **JavaScript**: Logic implementation for interactive features like CRUD operations and table manipulations.
   **FireBase**: For authorization and storage.
  
 **Logic Implementation**: DOM Manipulation is used to interactively update the webpage when students are added, modified, or deleted.
  
 **Storage**: 
   **Real-Time Firebase** & **Firebase** are used for authorization of student/teacher and for storing the details of student/teacher. 

### 2.2 Deployment
 The project can be deployed using platforms such as:
   **GitHub Pages**: For hosting static files with simple deployment.
   **Netlify**: For continuous deployment from Git repositories.
   **Docker**: For containerized deployment, allowing easier local development or production setup.


## 3. Setup and Installation

To run the **Student Database System** locally, follow the steps below:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/student-database-system.git
   cd student-database-system
   ```

2. **Open the Application**:
   - Open `index.html` in your preferred web browser.
   - Alternatively, deploy the project to platforms like GitHub Pages or Netlify for live access.


## 4. Usage

### Adding a Student Record:
1. Login as a Teacher.
2. Navigate to the **Add Student** button which will direct you to the Add Student details form.
3. Enter the student details ( name, age, register number, student email ID ).
4. Click the "Add Student" button to save the record.

### Viewing Student Records:
 All student records are displayed in a table.

### Updating Student Information:
1. Click the "Edit" button next to a student's record.
2. Update the details in the form and click "Save Changes."

### Deleting a Student Record:
1. Click the "Delete" button next to the student's record.
2. A confirmation prompt will appear to prevent accidental deletions.

### Sorting and Filtering:
 Use the sorting options at the top of the table to reorder the records by name, age, or grade.
 Filter the table using the filter options provided.


## 5. Contributors
 **Om Sharma** - Project Lead and Developer
 **Sachin Yadav** - Complete Css Lead
 **Arnab Boro** - Backend Developer
 **Manish Y M** - Helping Hand
 **Debashish Giri** - login Selector Page & Helping Css


6. License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Feel free to reach out if you have any questions or issues with the project!
