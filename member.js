function skillsMember() {
    var skills = document.getElementById("skills");
    var member = document.getElementById("member");
    var memberValue = member.value;
    var skillsValue = skills.value;
    var skillsMember = document.getElementById("skillsMember");
    var skillsMemberValue = skillsMember.value;
    if (memberValue == "yes") {
        skillsMember.style.display = "block";
    } else {
        skillsMember.style.display = "none";
    }
}