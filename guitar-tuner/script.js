const center = { x: 200, y: 200 };
const radius = 160;

function degToRad(d) {
  return (d * Math.PI) / 180;
}

function polar(cx, cy, r, angle) {
  const rad = degToRad(angle);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}

// будуємо дугу
function arcPath(start, end) {
  const s = polar(center.x, center.y, radius, start);
  const e = polar(center.x, center.y, radius, end);

  const largeArc = Math.abs(end - start) > 180 ? 1 : 0;
  const sweep = end > start ? 1 : 0;

  return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${e.x} ${e.y}`;
}


function lerp(a, b, t) {
    return a + (b-a) *t
}

function tickColorLeft(angle) {
    // red -> gray
    const t = -angle / 50
    const r = Math.round(lerp(128, 255, t));
    const g = Math.round(lerp(128, 0, t));
    const b = Math.round(lerp(128, 0, t));

  return `rgb(${r}, ${g}, ${b})`;
}

function tickColorRight(angle) {
    // red -> gray
    const t = angle / 50
    const r = Math.round(lerp(128, 0, t));
    const g = Math.round(lerp(128, 255, t));
    const b = Math.round(lerp(128, 0, t));

  return `rgb(${r}, ${g}, ${b})`;
}

function drawTickLeft(angle, major) {
    const rad = degToRad(angle-90)
    const offset = 2
    const length = 4 + (major ? 2 : 0)
    const r = radius
    x1 = center.x + (r+offset) * Math.cos(rad)
    x2 = center.x + (r+offset+length) * Math.cos(rad)
    y1 = center.y + (r+offset) * Math.sin(rad)
    y2 = center.y + (r+offset+length) * Math.sin(rad)

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);

    line.setAttribute("stroke", tickColorLeft(angle));
    line.setAttribute("stroke-width", 0.7);
    line.setAttribute("stroke-linecap", "round")

    const g = document.getElementById("ticks")
    g.appendChild(line);
}

function createLabel(angle, value) {
    // текст трохи всередині шкали
    const p = polar(center.x, center.y, radius + 14, angle-90);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    
    text.setAttribute("x", p.x);
    text.setAttribute("y", p.y);

    // центрування
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    var color = "gray"
    if (angle > 0) color = "green"
    if (angle < 0) color = "red"
    text.setAttribute("fill", color)

    text.setAttribute("font-size", "6");
    text.setAttribute("font-family", "Inter, sans-serif")
    text.textContent = value;

    const g = document.getElementById("ticks")
    g.appendChild(text);
}


function drawTickRight(angle, major) {
    const rad = degToRad(angle-90)
    const offset = 2
    const length = 4 + (major ? 2 : 0)
    const r = radius
    x1 = center.x + (r+offset) * Math.cos(rad)
    x2 = center.x + (r+offset+length) * Math.cos(rad)
    y1 = center.y + (r+offset) * Math.sin(rad)
    y2 = center.y + (r+offset+length) * Math.sin(rad)

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);

    line.setAttribute("stroke", tickColorRight(angle));
    line.setAttribute("stroke-width", 0.7);
    line.setAttribute("stroke-linecap", "round")

    const g = document.getElementById("ticks")
    g.appendChild(line);
}


// оновлення індикатора
function setValue(value) {
    // value: 0 → 100
    const startAngle = -90;

    document.getElementById("arcLeft").setAttribute("d", arcPath(-140, -90));
    document.getElementById("arcRight").setAttribute("d", arcPath(-90, -40));

    // стрілка
    const needleAngle = startAngle + value;

    const p = polar(center.x, center.y, radius, needleAngle);
    
    document.getElementById("needle")
        .setAttribute("x2", p.x);

    document.getElementById("needle")
        .setAttribute("y2", p.y);


    // needle2 line
    const lineStart = polar(center.x, center.y, radius+8, needleAngle)
    const lineEnd = polar(center.x, center.y, radius-16, needleAngle)
    const markerLine = document.getElementById("markerLine")
    markerLine.setAttribute("x1", lineStart.x);
    markerLine.setAttribute("y1", lineStart.y);
    markerLine.setAttribute("x2", lineEnd.x);
    markerLine.setAttribute("y2", lineEnd.y);
    // needle2
    const tip = polar(center.x, center.y, radius-12, needleAngle)
    const left = polar(center.x, center.y, radius-2, needleAngle-1.5)
    const right = polar(center.x, center.y, radius-2, needleAngle+1.5)
    const needle2 = document.getElementById("needle2")
    needle2.setAttribute(
        "points",
        `${tip.x},${tip.y}
        ${left.x},${left.y}
        ${right.x},${right.y}`
    )
    
}

// старт
for (i=0; i<=50; i++) {
    drawTickRight(i, i%10===0)
    if (i%10===0) {
        createLabel(i, i)
    }
}
for (i=-50; i<=0; i++) {
        drawTickLeft(i, i%10===0)
    if (i%10===0) {
        createLabel(i, i)
    }
}
setValue(-10);
