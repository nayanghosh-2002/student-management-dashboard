# 🎓 Student Management Dashboard  

A modern, responsive **React-based dashboard** designed to streamline student management, featuring a clean interface for adding, editing, and tracking student records.  

---

## ✨ Features  

- **Dashboard Overview** → Landing page with a summary of total students and a breakdown of students per course  
- **Student List** → View all enrolled students in an attractive, responsive card-based layout  
- **Add/Edit Student** → Dynamic form for adding new students or updating existing records  
- **Responsive UI** → Works seamlessly on desktop and mobile devices  
- **State Management** → Uses React Context API for efficient state sharing  
- **Asynchronous Operations** → Handles async tasks (data fetching & file uploads) with modern `async/await`  

---

## 🛠️ Technical Stack  

- **React** → Library for building UIs  
- **React Router** → Client-side routing  
- **Vite** → Fast, lightweight build tool  
- **CSS** → Modern styling with Flexbox & Grid  
- **ESLint** → Configured with React hooks & refresh plugins  
- **JavaScript** → ES6+ with `async/await` and Promises  

---

## 🚀 Getting Started  

### ✅ Prerequisites 
``` 
 Node.js  
 npm or yarn  
```

### 📥 Installation  

Clone the repository:  
```
git clone https://github.com/nayanghosh2002/student-management-dashboard
cd student-management-dashboard
```

Install dependencies:
```
npm install

```


App will be available at:
```bash
http://localhost:5173
```

###  🗄️ Mock API Setup
This project uses json-server to simulate a course API.

Install globally:
```
npm install -g json-server
```

Create a ```db.json``` file at the root of your project:

```
{
  "courses": [
    { "id": "1", "name": "course_1" },
    { "id": "2", "name": "course_2" },
    { "id": "3", "name": "course_3" },
    { "id": "4", "name": "course_4" }
  ]
}

```

Run the mock API:
```
json-server --watch db.json --port 4000

````

### 📂 Project Structure

```
src/
├── components/      # Reusable UI components (Navbar, StudentCard, StudentForm)
├── context/         # React Context for global state (StudentProvider)
├── hooks/           # Custom hooks (useCourses)
├── pages/           # Route-level pages (Dashboard, Add/Edit, etc.)
├── utils/           # Helper functions (fileToDataUrl, validateEmail)
├── App.jsx          # Main app component with routing
├── index.css        # Global styles
├── main.jsx         # Entry point
└── db.json          # Mock database for courses

```

### 💡 Code Highlights
**Async/Await**

The useCourses hook uses async/await for fetching data.
This makes code cleaner and avoids .then() chaining, while ensuring the UI remains responsive.

**Event Loop**

The StudentForm component includes comments showing execution order of:

    Microtask → Promise.resolve()

    Macrotask → setTimeout

This demonstrates how JavaScript handles concurrency and task prioritization.

**Hoisting Awareness**

The code uses const and let instead of var → prevents hoisting-related bugs by enforcing block-level scope.