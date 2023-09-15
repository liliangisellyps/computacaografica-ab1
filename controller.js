document.addEventListener("DOMContentLoaded", function () {
  scene = document.getElementById("#scene");
  player = document.getElementById("#player").object3D;
  hudConsole = document.getElementById("#hudConsole");
  ray = document.getElementById("#ray");
  camera = document.getElementById("#camera").object3D;
  b1 = document.getElementById("b1");
  b2 = document.getElementById("b2");
  b3 = document.getElementById("b3");
  b4 = document.getElementById("b4");
  paineisHud = document.getElementById("paineis");
  painelBoasVindas = document.getElementById("painelBoasVindas");
  painelPrimeiraMissao = document.getElementById("painelPrimeiraMissao");
  painelParabens = document.getElementById("painelParabens");
  painelTenteNovamente = document.getElementById("painelTenteNovamente");
  buttonBoard = document.getElementsByClassName("buttonBoard");

  paineis = [painelBoasVindas, painelPrimeiraMissao];
  currentPainelIdx = 0;

  domCamera = document.getElementById("#camera");
  hud = document.getElementById("#hud");
  initialY = 3;

  currentElement = undefined;
  hudElementPosition = -0.5;
  answerKey = [b6, b3, b1, b7, b8, b2];
  selectedButtons = [];

  controller0 = scene.renderer.xr.getController(0);
  controller0.addEventListener("selectstart", onSelect1Start);
  controller0.addEventListener("squeezestart", onSqueeze1Start);

  controller1 = scene.renderer.xr.getController(1);
  controller1.addEventListener("selectstart", onSelect1Start);
  controller1.addEventListener("squeezestart", onSqueeze1Start);

  scene.addEventListener("enter-vr", function () {
    painelBoasVindas.setAttribute("visible", true);
  });

  scene.addEventListener("exit-vr", function () {
    paineis.forEach((element) => {
      element.setAttribute("visible", "false");
    });
  });
});

function onSelect1Start() {
  if (currentElement) {
    hudElementCopy = currentElement.cloneNode(true);
    initialY -= 1;

    hudElementCopy.setAttribute("position", { x: -3, y: initialY, z: 0 });
    hudElementCopy.setAttribute("scale", "5 5 5");
    hudElementCopy.setAttribute("rotation", "0 0 0");
    hudElementCopy.setAttribute("visible", "true");

    currentElement.setAttribute("visible", "false");
    currentElement.setAttribute("buttonBoardHUD", "");

    hud.appendChild(hudElementCopy);

    selectedButtons.push(currentElement);

    correctAnswer = true;
    if (selectedButtons.length == 6) {
      for (let i = 0; i < selectedButtons.length; i++) {
        if (selectedButtons[i] != answerKey[i]) {
          correctAnswer = false;
        }
      }

      if (correctAnswer == true) {
        painelBoasVindas.setAttribute("visible", "false");
        painelParabens.setAttribute("visible", "true");
        selectedButtons.splice(selectedButtons.length - 1);

        setTimeout(() => {
          painelParabens.setAttribute("visible", "false");
          if (scene.is("vr-mode")) {
            scene.exitVR();
          }
          window.location.href = "nivel-2.html";
        }, 15000);
      } else {
        painelBoasVindas.setAttribute("visible", "false");
        painelTenteNovamente.setAttribute("visible", "true");
        selectedButtons.splice(selectedButtons.length - 1);

        setTimeout(() => {
          hud.getChildren().forEach((child) => {
            hud.removeChild(child);
          });
          Array.from(buttonBoard).forEach((element) => {
            element.setAttribute("visible", "true");
          });
        }, 5000);
      }
    }

    hudElementCopy.removeAttribute("clicable");

    currentElement = undefined;
  }
}

function onSqueeze1Start() {
  if (currentPainelIdx == paineis.length - 1) {
    paineis[currentPainelIdx].setAttribute("visible", "false");
  } else {
    paineis[currentPainelIdx].setAttribute("visible", "false");

    currentPainelIdx++;
    paineis[currentPainelIdx].setAttribute("visible", "true");
  }
}
