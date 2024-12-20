function checkGrade(grades) {
    getNumber = 0;
    if (grades >= 97.50) {
        getNumber = 1.00;
    }
    else if (grades >= 94.50 && grades <= 97.49) {
        getNumber = 1.25;
    }
    else if (grades >= 91.50 && grades <= 94.49) {
        getNumber = 1.50;
    }
    else if (grades >= 88.50 && grades <= 91.49) {
        getNumber = 1.75;
    }
    else if (grades >= 85.50 && grades <= 88.49) {
        getNumber = 2.00;
    }
    else if (grades >= 81.50 && grades <= 85.49) {
        getNumber = 2.25;
    }
    else if (grades >= 77.50 && grades <= 81.49) {
        getNumber = 2.50;
    }
    else if (grades >= 73.50 && grades <= 77.49) {
        getNumber = 2.75;
    }
    else if (grades >= 69.50 && grades <= 73.49) {
        getNumber = 3.00;
    }
    else if (grades <= 69.49) {
        getNumber = 5.00;
    }
    return getNumber.toFixed(2);
}
document.addEventListener("DOMContentLoaded", () => {
    const subject = document.getElementById("subjectName");
    const firstTerm = document.getElementById("prelim");
    const secondTerm = document.getElementById("midterm");
    const thirdTerm = document.getElementById("preFinals");
    const finalTerm = document.getElementById("finals");
    const totalUnits = document.getElementById("totalUnits")
    submit.addEventListener("click", () => {
        const nameCourse = subject.value;
        const units = parseFloat(totalUnits.value).toFixed(2);
        const value1 = parseFloat(firstTerm.value);
        const value2 = parseFloat(secondTerm.value);
        const value3 = parseFloat(thirdTerm.value);
        const value4 = parseFloat(finalTerm.value);
        const compute = (value1 + value2 + value3 + value4) / 4.0;
        const totals = parseFloat(compute.toFixed(2));
        let get = "";
        if (checkGrade(totals) < units) {
            get = `PASSED`;
        }
        else {
            get = "FAILED";
        }
        let htmlOutput = null;
        if (isNaN(value1) || isNaN(value2) || isNaN(value3) || isNaN(value4) || isNaN(units)) {
            htmlOutput = `Please enter the valid numeric values.`;
        }
        else if (nameCourse == '') {
            htmlOutput = `Please enter the name of the subject.`;
        }
        else {
            htmlOutput =  `
                Subject Name: ${nameCourse}<br>
                Total Units: ${units}<br>
                Final Grade: ${totals} / ${checkGrade(totals)}<br>
                Status: <div class="pass-color">${get}</div>
            `;
        }
        output.innerHTML = htmlOutput;
    });
    clear.addEventListener("click", () => {
       let allContents = [
            subject, firstTerm, secondTerm,
            thirdTerm, finalTerm, totalUnits
        ]
        for (let i = 0; i < allContents.length; i++) {
            allContents[i].value = "";
        }
        output.innerHTML = "";
    });
});