const modulo = (() => { "use strict"; let e = []; const t = ["C", "D", "H", "S"],
        n = ["A", "J", "Q", "K"]; let r = []; const l = document.querySelector("#btnPedir"),
        o = document.querySelector("#btnDetener"),
        a = document.querySelector("#btnNuevo"),
        s = document.querySelectorAll(".divCartas"),
        c = document.querySelectorAll("small"),
        d = (t = 2) => { e = i(), r = []; for (let e = 0; e < t; e++) r.push(0);
            c.forEach(e => e.innerText = 0), s.forEach(e => e.innerHTML = ""), l.disabled = !1, o.disabled = !1 },
        i = () => { e = []; for (let n = 2; n <= 10; n++)
                for (let r of t) e.push(n + r); for (let r of t)
                for (let t of n) e.push(t + r); return _.shuffle(e) },
        u = () => { if (0 === e.length) throw "No hay cartas en el deck"; return e.pop() };
    l.addEventListener("click", () => { const e = u(),
            t = b(e, 0);
        f(e, 0), t > 21 ? (console.warn("Has perdido!"), l.disabled = !0, o.disabled = !0, g(t)) : 21 === t && (console.warn("21, bien!"), l.disabled = !0, o.disabled = !0, g(t)) }), o.addEventListener("click", () => { o.disabled = !0, l.disabled = !0, g(r[0]) }), a.addEventListener("click", () => { d() }); const b = (e, t) => (r[t] = r[t] + (e => { const t = e.substring(0, e.length - 1);
            console.log(t); let n = 0; return n = isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), c[t].innerText = r[t], r[t]),
        f = (e, t) => { const n = document.createElement("img");
            n.src = `assets/cartas/${e}.png`, n.classList.add("carta"), s[t].append(n) },
        g = e => { let t = 0;
            do { const e = u();
                t = b(e, r.length - 1), f(e, r.length - 1) } while (t < e && e <= 21);
            (() => { const [e, t] = r;
                setTimeout(() => { t === e ? alert("Empate...") : e > 21 ? alert("Máquina gana!!") : t > 21 ? alert("Jugador gana!!") : alert("Máquina gana!!") }, 100) })() }; return { nuevoJuego: d } })();