# Attendance Tracker and Utilities Website

This project is a comprehensive web application that combines attendance tracking, a coin toss feature for decision-making, and a to-do list to manage tasks. Built using modern web technologies, it offers an intuitive interface and helpful utilities for everyday use.

---

## Features

### 1. **Attendance Tracking**
- Track classes attended and missed.
- View statistics to monitor attendance.
- User-friendly interface for easy updates.

### 2. **Coin Toss Decision Maker**
- Simulate a coin toss with a realistic 3D coin.
- Use for making quick and fair decisions.

### 3. **To-Do List**
- Add, update, and delete tasks.
- Manage priorities and organize daily goals.

### 4. **Modern Design**
- Responsive UI built with Tailwind CSS.
- Clean and minimalistic layout.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/aaditya3301/attendyo.git
   cd attendyo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Tailwind development process:
   ```bash
   npm run start:tailwind
   ```
4. Open your project in VS Code and use the "Go Live" extension to launch the site locally.

   The "Go Live" button is available in the bottom-right corner of VS Code after installing       the Live Server extension.
   It will automatically serve your site on a local development server and open it in your        browser.
   
   ---

## Tailwind CSS Usage

This project uses Tailwind CSS for styling, with all classes prefixed by `tw-` to differentiate them from other CSS classes.

### Development
Include the runtime Tailwind stylesheet in the `<head>` of your HTML files:
```html
<link rel="stylesheet" href="./css/tailwind-runtime.css">
```

Start the Tailwind development process:
```bash
npm run start:tailwind
```

### Production
Switch to the built Tailwind stylesheet for optimized performance:
```html
<link rel="stylesheet" href="./css/tailwind-build.css">
```

Create the production build:
```bash
npm run build:tailwind
```

---

## Project Structure

```plaintext
project-root
├── index.html             # Main landing page
├── attendance.html        # Attendance tracking feature
├── todo.html              # To-Do list feature
├── css/                   # Tailwind CSS and custom styles
├── js/                    # JavaScript functionality
├── assets/                # Images and media
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── .vscode/               # VS Code project settings
```

---

## License
This project is licensed under the terms of the MIT License.

---

## Support
If you have any issues or need assistance, feel free to reach out...
