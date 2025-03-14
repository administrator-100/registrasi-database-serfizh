// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAwQZUHmZvCJ4jr4RnIyJXRwK09kWC9Fuw",
  authDomain: "data-guru-abudzar.firebaseapp.com",
  projectId: "data-guru-abudzar",
  storageBucket: "data-guru-abudzar.firebasestorage.app",
  messagingSenderId: "214892876036",
  appId: "1:214892876036:web:ef67bbd3647524bf3dc051",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {

  // Mencegah reload halaman jika dipanggil sebagai fungsi onclick
  event.preventDefault();
  
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Mohon lengkapi email & password...')
    return
    // Don't continue running the code
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      password : password,
      last_login : Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      .then(() => {
        alert('Sukses Mendaftar...');
        window.location.href = 'register.html';
      })
      .catch(function(error) {
        // Tangani kesalahan saat menyimpan data
        console.error("Error menyimpan data ke database:", error);
        alert('Gagal menyimpan data pengguna');
      });
  })
  .catch(function(error) {
    // Tangani kesalahan saat pendaftaran
    var error_code = error.code;
    var error_message = error.message;
    console.error("Error pendaftaran:", error_code, error_message);
    alert(error_message);
  });
}


// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
};

// Fungsi untuk menampilkan loading screen
function showLoading() {
  document.getElementById("loading-screen").style.visibility = "visible";
}

// Fungsi untuk menyembunyikan loading screen
function hideLoading() {
  document.getElementById("loading-screen").style.visibility = "hidden";
}

// Tampilkan loading screen saat pengguna mengklik tautan
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault(); // Mencegah perpindahan halaman secara langsung
    showLoading(); // Tampilkan loading screen

    // Setelah 1 detik, arahkan ke halaman tujuan
    setTimeout(() => {
      window.location.href = link.href;
    }, 250); // Anda bisa menyesuaikan durasi sesuai keinginan
  });
});

// Sembunyikan loading screen setelah halaman dimuat
window.addEventListener("load", hideLoading);
