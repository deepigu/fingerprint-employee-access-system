// ===== UI FUNCTIONS =====
function showRegister() {
    document.getElementById("registerModal").style.display = "block";
}

function showAuthenticate() {
    document.getElementById("authModal").style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// ===== REGISTER EMPLOYEE =====
function registerEmployee() {
    const id = document.getElementById("regId").value.trim();
    const name = document.getElementById("regName").value.trim();
    const fingerprint = document.getElementById("regFinger").value.trim();
    const pin = document.getElementById("regPin").value.trim();
    const role = document.getElementById("regRole").value;

    if (!id || !name || !fingerprint || !pin) {
        alert("❌ Please fill all fields");
        return;
    }

    database.ref("employees/" + id).set({
        id,
        name,
        fingerprint,
        pin,
        role
    })
    .then(() => {
        alert("✅ Employee Registered Successfully");

        document.getElementById("regId").value = "";
        document.getElementById("regName").value = "";
        document.getElementById("regFinger").value = "";
        document.getElementById("regPin").value = "";

        closeModal("registerModal");
    })
    .catch(error => {
        alert("❌ Firebase Error: " + error.message);
    });
}

// ===== AUTHENTICATE EMPLOYEE =====
function authenticateEmployee() {
    const id = document.getElementById("authId").value.trim();
    const fingerprint = document.getElementById("authFinger").value.trim();
    const pin = document.getElementById("authPin").value.trim();

    if (!id || !fingerprint || !pin) {
        alert("❌ Please fill all fields");
        return;
    }

    database.ref("employees/" + id).once("value")
        .then(snapshot => {
            if (!snapshot.exists()) {
                alert("❌ Employee not found");
                return;
            }

            const emp = snapshot.val();

            if (emp.fingerprint === fingerprint && emp.pin === pin) {
                alert("✅ Access Granted (" + emp.role + ")");
            } else {
                alert("❌ Access Denied");
            }

            document.getElementById("authId").value = "";
            document.getElementById("authFinger").value = "";
            document.getElementById("authPin").value = "";

            closeModal("authModal");
        })
        .catch(error => {
            alert("❌ Firebase Error: " + error.message);
        });
}

// ===== LIST EMPLOYEES =====
function listEmployees() {
    database.ref("employees").once("value")
        .then(snapshot => {
            const output = document.getElementById("output");

            if (!snapshot.exists()) {
                output.innerText = "No employees registered";
                return;
            }

            let text = "📋 Registered Employees:\n\n";
            snapshot.forEach(child => {
                const emp = child.val();
                text += `ID: ${emp.id}\nName: ${emp.name}\nRole: ${emp.role}\n\n`;
            });

            output.innerText = text;
        });
}

// ===== TOTAL EMPLOYEES =====
function checkTotal() {
    database.ref("employees").once("value")
        .then(snapshot => {
            const count = snapshot.exists() ? snapshot.numChildren() : 0;
            alert("👥 Total Employees: " + count);
        });
}
