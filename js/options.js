// Loading input fields states
chrome.storage.sync.get(
	{
		// Set of settings keys we retrieve and their default values
		// Generator settings
		length: 16,
		includeSymbols: true,
		includeNumbers: true,
		includeLowercase: true,
		includeUppercase: true,
		excludeSimilar: true,
		excludeSpecial: true,

		// Extension settings
		showButton: true,
		showContext: true
	},
	(settings) =>
	{
		if (window.matchMedia("(prefers-color-scheme: dark)").matches)	// Doesn't work on Fiefox
			document.querySelector("#darkStylesheet").removeAttribute("disabled");

		document.querySelector("#length").value = settings.length;	// Setting length value

		// Setting checkboxes
		[
			"includeSymbols",
			"includeNumbers",
			"includeLowercase",
			"includeUppercase",
			"excludeSimilar",
			"excludeSpecial",

			"showButton",
			"showContext"
		].forEach(i => document.querySelector("#" + i).checked = settings[i]);

		SetupEventHandlers();
		document.querySelector("#version").textContent = "v" + chrome.runtime.getManifest()["version"];						// Updating display version
		document.querySelectorAll("*[loc]").forEach(i => i.textContent = chrome.i18n.getMessage(i.getAttribute("loc")));	// Updating localization
	});

function SetupEventHandlers()
{
	document.querySelectorAll("input").forEach(i =>
		i.addEventListener("input",
			() => chrome.storage.sync.set(JSON.parse("{ \"" + i.id + "\": " + (i.type == "checkbox" ? i.checked : i.value) + " }"))));

	document.querySelector("#generate").addEventListener("click", () => GeneratePassword(null));
	document.querySelector("#more").addEventListener("click", (s) =>
	{
		let group = document.querySelector("#about");
		if (group.hasAttribute("hidden"))
		{
			group.removeAttribute("hidden");
			s.currentTarget.querySelector("i").textContent = "";
		}
		else
		{
			group.setAttribute("hidden", "");
			s.currentTarget.querySelector("i").textContent = "";
		}
	});
}
function checkPassword() {
	var password = document.getElementById("password").value;
	var strength = checkPasswordStrength(password);

	var resultElement = document.getElementById("strengthResult");
	var strengthText = "";

	function checkPassword() {
		var password = document.getElementById("password").value;
		var strength = checkPasswordStrength(password);
	
		var resultElement = document.getElementById("strengthResult");
		var strengthText = "";
	
		switch (strength) {
			case 0:
				strengthText = "Very Weak";
				break;
			case 1:
				strengthText = "Weak";
				break;
			case 2:
				strengthText = "Moderate";
				break;
			case 3:
				strengthText = "Strong";
				break;
			case 4:
				strengthText = "Very Strong";
				break;
			default:
				strengthText = "Unknown";
		}
	
		resultElement.innerHTML = "<p>Password Strength: <span class='strength'>" + strengthText + "</span></p>";
	}

	
}