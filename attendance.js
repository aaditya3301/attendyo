
// Dark mode functionality
if (localStorage.getItem('color-mode') === 'dark' || (!('color-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('tw-dark')
  updateToggleModeBtn()
} else {
  document.documentElement.classList.remove('tw-dark')
  updateToggleModeBtn()
}

function toggleMode() {
  document.documentElement.classList.toggle("tw-dark")
  updateToggleModeBtn()
}

function updateToggleModeBtn() {
  const toggleIcon = document.querySelector("#toggle-mode-icon")

  if (document.documentElement.classList.contains("tw-dark")) {
    toggleIcon.classList.remove("bi-sun")
    toggleIcon.classList.add("bi-moon")
    localStorage.setItem("color-mode", "dark")
  } else {
    toggleIcon.classList.add("bi-sun")
    toggleIcon.classList.remove("bi-moon")
    localStorage.setItem("color-mode", "light")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const totalAttendanceEl = document.getElementById("total-attendance");
  const minimumAttendanceEl = document.getElementById("minimum-attendance");
  const attendanceSlider = document.getElementById("attendance-slider");
  const sliderValueLabel = document.getElementById("slider-value");

  // Placeholder data for attendance (example values)
  const subjects = [
    { name: "Math", attended: 18, total: 20 },
    { name: "Science", attended: 15, total: 20 },
    { name: "History", attended: 19, total: 20 },
  ];

  // Calculate Total Attendance Percentage
  function calculateTotalAttendance() {
    const totalClasses = subjects.reduce((sum, subject) => sum + subject.total, 0);
    const attendedClasses = subjects.reduce((sum, subject) => sum + subject.attended, 0);
    return ((attendedClasses / totalClasses) * 100).toFixed(2);
  }

  // Update Total Attendance Display
  function updateTotalAttendance() {
    const totalAttendance = calculateTotalAttendance();
    totalAttendanceEl.textContent = totalAttendance;
  }

  // Update Minimum Attendance Goal and Label
  attendanceSlider.addEventListener("input", () => {
    const minimumAttendance = attendanceSlider.value;
    minimumAttendanceEl.textContent = minimumAttendance;

    // Update slider label position and value
    sliderValueLabel.textContent = `${minimumAttendance}%`;
    const sliderPosition = ((minimumAttendance - 50) / (100 - 50)) * 100; // Normalize to range 50-100
    sliderValueLabel.style.left = `${sliderPosition}%`;
  });

  // Initialize the display
  updateTotalAttendance();
});

document.addEventListener("DOMContentLoaded", () => {
  const attendanceSlider = document.getElementById("attendance-slider");
  const sliderTooltip = document.getElementById("slider-tooltip");

  // Update tooltip position and value
  attendanceSlider.addEventListener("input", () => {
    const value = attendanceSlider.value;
    sliderTooltip.textContent = `${value}%`;

    // Calculate tooltip position based on slider value
    const percentage = ((value - 50) / (100 - 50)) * 100;
    sliderTooltip.style.left = `${percentage}%`;

    // Center the tooltip and adjust its vertical position
    sliderTooltip.style.transform = `translate(-50%, 20px)`;
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("open-modal-btn");
  const subjectModal = document.getElementById("subject-modal");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");
  const saveModalBtn = document.getElementById("save-modal-btn");

  // Modal Input Elements
  const subjectNameInput = document.getElementById("modal-subject-name");
  const attendedInput = document.getElementById("modal-attended");
  const missedInput = document.getElementById("modal-missed");
  const totalInput = document.getElementById("modal-total");

  // Subject Cards Container
  const subjectCardsContainer = document.getElementById("subject-cards-container");

  // Array to store subjects
  const subjects = [];

  // Open Modal
  openModalBtn.addEventListener("click", () => {
      subjectModal.classList.add("show");
  });

  // Close Modal
  cancelModalBtn.addEventListener("click", () => {
      subjectModal.classList.remove("show");
      clearModalInputs();
  });

  // Save Subject and Add to Card
  saveModalBtn.addEventListener("click", () => {
      const subjectName = subjectNameInput.value.trim();
      const attended = parseInt(attendedInput.value, 10) || 0;
      const missed = parseInt(missedInput.value, 10) || 0;
      const total = parseInt(totalInput.value, 10) || 0;

      // Validation: Ensure subject name and total lectures are valid
      if (!subjectName || total <= 0 || attended > total || missed > total) {
          alert("Please provide a valid subject name and total lectures.");
          return; // Stop the function if validation fails
      }

      // Create Subject Object
      const subject = {
          id: Date.now(),
          name: subjectName,
          attended,
          missed,
          total,
          attendancePercentage: ((attended / total) * 100).toFixed(2),
      };

      // Add the subject to the array
      subjects.push(subject);

      // Update UI (Create and Add Subject Card)
      addSubjectCard(subject);

      // Close Modal and Clear Inputs
      subjectModal.classList.remove("show");
      clearModalInputs();

      // Update overall attendance percentage
     
      updateOverallAttendance();
      updateAttendanceCircle();
  });

  function addSubjectCard(subject) {
      const card = document.createElement("div");

      // Get the total number of classes (attended + missed)
      const totalClasses = subject.attended + subject.missed;
      const attendancePercentage = ((subject.attended / totalClasses) * 100).toFixed(2);

      // Get the minimum attendance percentage from the slider
      const minimumAttendance = document.getElementById("attendance-slider").value;

      // Determine the color for the attendance percentage and minimum attendance
      const attendanceColor = attendancePercentage >= minimumAttendance ? "tw-text-green-500" : "tw-text-red-500";
      const minimumColor = attendancePercentage >= minimumAttendance ? "tw-text-green-500" : "tw-text-red-500";

      // Calculate the required number of lectures to attend or miss
      let requiredAttendance = (minimumAttendance / 100) * subject.total;
      let remainingLecturesToAttend = Math.ceil(requiredAttendance - subject.attended);
      let remainingLecturesToMiss = Math.floor(subject.total - requiredAttendance - subject.missed);

      // Determine the card's color (Red if below, Green if above)
      let cardColorGreen = attendancePercentage < minimumAttendance ? false : true;

      // Card structure with the attendance percentage and minimum percentage
      card.className = `tw-rounded-lg tw-shadow-xl tw-p-0 tw-flex tw-gap-6 tw-flex-col items-center ${cardColorGreen ? 'tw-bg-green-200 dark:tw-bg-green-900' : 'tw-bg-red-200 dark:tw-bg-red-900'} tw-transition-all hover:tw-transform hover:tw-scale-105`;

      card.innerHTML = `
       
        <!-- Attendance Status and Minimum Attendance -->
        <div class="tw-flex tw-flex-col tw-items-center tw-gap-2 tw-m-0 tw-p-6">
          <div class="tw-flex tw-items-center tw-gap-2">
            <span class="tw-font-semibold tw-text-xl text-white">Attendance</span>
            <span class="tw-font-semibold tw-text-xl ${attendanceColor} attendance-percentage">${attendancePercentage}%</span>
          </div>
          <div class="tw-flex tw-items-center tw-gap-2">
            <span class="tw-font-semibold tw-text-xl text-white">Minimum</span>
            <span class="tw-font-semibold tw-text-xl ${minimumColor}">${minimumAttendance}%</span>
          </div>

          <!-- Subtle line to show status -->
          <div class="tw-w-[50px] tw-h-[4px] status-line ${attendancePercentage >= minimumAttendance ? 'tw-bg-green-500' : 'tw-bg-red-500'} tw-rounded-full tw-mt-2"></div>

          <!-- Info about missed or remaining lectures -->
          <div class="tw-text-sm tw-font-medium text-white tw-mt-2 info-text">
            ${attendancePercentage < minimumAttendance ?
              `You need to attend <strong>${remainingLecturesToAttend}</strong> more lectures to meet the minimum attendance.` :
              `You can miss <strong>${remainingLecturesToMiss}</strong> more lectures and still maintain the required attendance.`
            }
          </div>

          <!-- Attended, Missed, Total Classes Information -->
          <div class="tw-flex tw-gap-4 tw-mt-4 text-white">
            <div>
              <strong>Att:</strong> <span class="attended-count">${subject.attended}</span>
            </div>
            <div>
              <strong>Miss:</strong> <span class="missed-count">${subject.missed}</span>
            </div>
            <div>
              <strong>Tot:</strong> <span class="total-count">${subject.total}</span>
            </div>
          </div>
            <div tw-flex tw-items-center tw-justify-center>
               <!-- Attended Button -->
          <button class="attended-btn tw-bg-green-500 tw-text-white tw-rounded-md tw-py-2 tw-px-4 tw-mt-4" data-id="${subject.id}">
            Attended
          </button>
        

        <!-- Missed Button -->
        <button class="missed-btn p-5 tw-bg-red-500 tw-text-white tw-rounded-md tw-py-2 tw-px-4 tw-mt-4" data-id="${subject.id}">
          Missed
        </button>
          </div>
    
      </div>
      `;

      // Append the card to the container
      subjectCardsContainer.appendChild(card);

      // Add event listener to the "Attended" button
      const attendedButton = card.querySelector(".attended-btn");
      attendedButton.addEventListener("click", () => {
          updateAttendance(subject.id);
      });

          // Add event listener to the "Missed" button
    const missedButton = card.querySelector(".missed-btn");
    missedButton.addEventListener("click", () => {
        updateMissed(subject.id);
    });

  }

  function updateAttendance(subjectId) {
      // Find the subject in the array
      const subject = subjects.find(s => s.id === subjectId);
      if (!subject) return;

      // Update attendance and total lectures
      subject.attended += 1;
      subject.total += 1;
      const attendancePercentage = ((subject.attended / subject.total) * 100).toFixed(2);

      // Find the card element
      const card = document.querySelector(`[data-id="${subjectId}"]`).closest('.tw-flex');
      if (!card) return;

      // Update the card content
      const attendanceText = card.querySelector('.attendance-percentage');
      if (attendanceText) {
          const attendanceCircle =  calculateOverallAttendance();
          attendanceText.textContent = attendanceCircle;
      }
      
      const minimumAttendance = document.getElementById("attendance-slider").value;
      const attendanceColor = attendancePercentage >= minimumAttendance ? "tw-text-green-500" : "tw-text-red-500";
      const minimumColor = attendancePercentage >= minimumAttendance ? "tw-text-green-500" : "tw-text-red-500";
      const cardColorGreen = attendancePercentage < minimumAttendance ? false : true;

      // Update the card's color
      card.classList.remove('tw-bg-red-200', 'tw-bg-green-200', 'dark:tw-bg-red-900', 'dark:tw-bg-green-900');
      if (cardColorGreen) {
          card.classList.add('tw-bg-green-200', 'dark:tw-bg-green-900');
      } else {
          card.classList.add('tw-bg-red-200', 'dark:tw-bg-red-900');
      }

      // Update the button colors
      const attendedBtn = card.querySelector('.attended-btn');
      if (attendedBtn) {
          attendedBtn.classList.remove('tw-text-green-500', 'tw-text-red-500');
          attendedBtn.classList.add(attendanceColor);
      }

      // Update the attended, missed, and total lectures text
      const attendedStatus = card.querySelector('.attended-count');
      if (attendedStatus) {
          attendedStatus.textContent = subject.attended;
      }

      const totalStatus = card.querySelector('.total-count');
      if (totalStatus) {
          totalStatus.textContent = subject.total;
      }

      // Update the subtle line color
      const statusLine = card.querySelector('.status-line');
      if (statusLine) {
          statusLine.classList.remove('tw-bg-green-500', 'tw-bg-red-500');
          statusLine.classList.add(attendancePercentage >= minimumAttendance ? 'tw-bg-green-500' : 'tw-bg-red-500');
      }

      // Update the info about missed or remaining lectures
      const infoText = card.querySelector('.info-text');
      if (infoText) {
          const requiredAttendance = (minimumAttendance / 100) * subject.total;
          const remainingLecturesToAttend = Math.ceil(requiredAttendance - subject.attended);
          const remainingLecturesToMiss = Math.floor(subject.total - requiredAttendance - subject.missed);
          infoText.innerHTML = attendancePercentage < minimumAttendance ?
              `You need to attend <strong>${remainingLecturesToAttend}</strong> more lectures to meet the minimum attendance.` :
              `You can miss <strong>${remainingLecturesToMiss}</strong> more lectures and still maintain the required attendance.`;
      }

      // Update the overall attendance percentage at the top of the card
    
      updateOverallAttendance();
  }

  function updateMissed(subjectId) {
    // Find the subject in the array
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    // Update missed and total lectures
    subject.missed += 1;
    subject.total += 1;
    const attendancePercentage = ((subject.attended / subject.total) * 100).toFixed(2);

    // Find the card element
    const card = document.querySelector(`[data-id="${subjectId}"]`).closest('.tw-flex');
    if (!card) return;

    // Update the card content
     const attendanceText = card.querySelector('.attendance-percentage');
       if (attendanceText) {
      const attendanceCircle =  calculateOverallAttendance();
      attendanceText.textContent = attendanceCircle;
  }

    const minimumAttendance = document.getElementById("attendance-slider").value;
    const attendanceColor = attendancePercentage >= minimumAttendance ? "tw-text-green-500" : "tw-text-red-500";
    const minimumColor = attendancePercentage >= minimumAttendance ? "tw-text-green-500" : "tw-text-red-500";
    const cardColorGreen = attendancePercentage < minimumAttendance ? false : true;

    // Update the card's color
    card.classList.remove('tw-bg-red-200', 'tw-bg-green-200', 'dark:tw-bg-red-900', 'dark:tw-bg-green-900');
    if (cardColorGreen) {
        card.classList.add('tw-bg-green-200', 'dark:tw-bg-green-900');
    } else {
        card.classList.add('tw-bg-red-200', 'dark:tw-bg-red-900');
    }

    //Update the button colors
    const attendedBtn = card.querySelector('.attended-btn');
    if (attendedBtn) {
        attendedBtn.classList.remove('tw-text-green-500', 'tw-text-red-500');
        attendedBtn.classList.add(attendanceColor);
    }

    // Update the attended, missed, and total lectures text
    const attendedStatus = card.querySelector('.attended-count');
    if (attendedStatus) {
        attendedStatus.textContent = subject.attended;
    }

    const missedStatus = card.querySelector('.missed-count');
    if (missedStatus) {
        missedStatus.textContent = subject.missed;
    }

    const totalStatus = card.querySelector('.total-count');
    if (totalStatus) {
        totalStatus.textContent = subject.total;
    }

    // Update the subtle line color
    const statusLine = card.querySelector('.status-line');
    if (statusLine) {
        statusLine.classList.remove('tw-bg-green-500', 'tw-bg-red-500');
        statusLine.classList.add(attendancePercentage >= minimumAttendance ? 'tw-bg-green-500' : 'tw-bg-red-500');
    }

    // Update the info about missed or remaining lectures
    const infoText = card.querySelector('.info-text');
    if (infoText) {
        const requiredAttendance = (minimumAttendance / 100) * subject.total;
        const remainingLecturesToAttend = Math.ceil(requiredAttendance - subject.attended);
        const remainingLecturesToMiss = Math.floor(subject.total - requiredAttendance - subject.missed);
        infoText.innerHTML = attendancePercentage < minimumAttendance ?
            `You need to attend <strong>${remainingLecturesToAttend}</strong> more lectures to meet the minimum attendance.` :
            `You can miss <strong>${remainingLecturesToMiss}</strong> more lectures and still maintain the required attendance.`;
    }

    // Update the overall attendance percentage at the top of the card
   
    updateOverallAttendance();
}

  function calculateOverallAttendance() {
      const totalClasses = subjects.reduce((sum, subject) => sum + subject.total, 0);
      const attendedClasses = subjects.reduce((sum, subject) => sum + subject.attended, 0);
      return ((attendedClasses / totalClasses) * 100).toFixed(2);
  }

  function updateOverallAttendance() {
      const overallAttendanceText = document.getElementById('total-attendance');
      if (overallAttendanceText) {
          const overallAttendancePercentage = calculateOverallAttendance();
          overallAttendanceText.textContent = overallAttendancePercentage;
      }
  }

  function updateAttendanceCircle() {
    const attendanceText = card.querySelector('.attendance-percentage');
    if (attendanceText) {
      const attendanceCircle =  calculateOverallAttendance();
      attendanceText.textContent = attendanceCircle;
  }
}

  // Clear Modal Inputs
  function clearModalInputs() {
      subjectNameInput.value = "";
      attendedInput.value = "";
      missedInput.value = "";
      totalInput.value = "";
  }
});





