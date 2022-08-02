let step = 1
const $progress = document.querySelector("#progress")
const $items = document.querySelectorAll(".step")
const $prev = document.querySelector("#prev")
const $next = document.querySelector("#next")

const checkButton = () => {
  if (step > 1) {
    $prev.removeAttribute("disabled")
  } else {
    $prev.setAttribute("disabled", "true")
  }

  if (step < 4) {
    $next.removeAttribute("disabled")
  } else {
    $next.setAttribute("disabled", "true")
  }
}

const addStep = (number) => {
  step = step + number
  checkButton()
}

$prev.addEventListener("click", function (event) {
  if (step === 1) {
    return
  }
  addStep(-1)
  changeProgressBar(step)
})

$next.addEventListener("click", function (event) {
  if (step === $items.length) {
    return
  }
  addStep(1)
  changeProgressBar(step)
})

const changeProgressBar = () => {
  const styles = {
    ["--progress-width"]: `${getProgressSize(step)}px`,
  }
  $progress.style.setProperty(...Object.keys(styles), ...Object.values(styles))

  $items.forEach((item, index) => {
    if (index < step) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })
}

const gap = getComputedStyle($items[0].parentElement).getPropertyValue("gap")

const getStepWidth = (step) => {
  const $activeSteps = document.querySelectorAll(".step.active")

  let width = 0
  $activeSteps.forEach((item, index) => {
    width += item.offsetWidth

    if (index === step - 1) {
      item.setAttribute("is-current", true)
    } else {
      item.removeAttribute("isCurrent")
    }
  })
  return width
}
const getProgressSize = (step) => {
  const size = (step - 1) * parseInt(gap) + getStepWidth(step)
  return size
}
