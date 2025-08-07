let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      sec.classList.add("show-animate");
    }
  });
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  let footer = document.querySelector("footer");

  footer.classList.add(
    "show-animate",
    this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
  );
};

const form = document.querySelector("form");

const fullname = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullname.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${message.value}`;

  Email.send({
    // Host: "smtp.elasticemail.com",
    // Username: "anandemmanuel.billa@gmail.com",
    // Password: "303D129C27B60A4A007805C2B1890A1294BB",
    // Password: "af75e75e-48f0-4d48-8a1f-edc6b75ba024",
    To: "anandemmanuel.billa@gmail.com",
    From: "anandemmanuel.billa@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((response) => {
    if (response === "OK") {
      Swal.fire({
        title: "Message received :-)",
        text: "I’ll boomerang back to you shortly!",
        icon: "success",
      });

      fullname.value = "";
      email.value = "";
      phone.value = "";
      subject.value = "";
      message.value = "";
    } else {
      Swal.fire({
        title: "Failed to send",
        text: "Server error: " + response,
        icon: "error",
      });
    }
  });
}

function checkEmail() {
  const emailPattern =
    /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  if (!emailPattern.test(email.value)) {
    Swal.fire({
      title: "Invalid Email",
      text: "Please enter a valid email address.",
      icon: "error",
    });
    return false;
  }
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkEmail()) {
    sendEmail();
  }
});
