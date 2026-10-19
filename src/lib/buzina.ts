/*
 * Buzina de caminhão sintetizada com a Web Audio API (sem arquivo de áudio).
 * Acorde grave de três notas em dente de serra, com filtro passa-baixa e um
 * leve "caimento" no fim, tocado duas vezes: fon-fon.
 * Só funciona a partir de um clique (regra de autoplay dos navegadores).
 */

let contexto: AudioContext | null = null

function obterContexto() {
  if (typeof window === "undefined") return null
  const Ctx =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return null
  contexto ??= new Ctx()
  return contexto
}

const NOTAS = [185, 233, 277] // Fá#, Lá#, Dó# graves: o acorde de buzina a ar

export function buzinar(volume = 0.12) {
  try {
    const ctx = obterContexto()
    if (!ctx) return
    void ctx.resume()

    const saida = ctx.createGain()
    saida.gain.value = volume
    const filtro = ctx.createBiquadFilter()
    filtro.type = "lowpass"
    filtro.frequency.value = 1700
    filtro.Q.value = 0.7
    filtro.connect(saida)
    saida.connect(ctx.destination)

    const toque = (inicio: number, duracao: number) => {
      const envelope = ctx.createGain()
      envelope.gain.setValueAtTime(0, inicio)
      envelope.gain.linearRampToValueAtTime(1, inicio + 0.03)
      envelope.gain.setValueAtTime(1, inicio + duracao - 0.07)
      envelope.gain.linearRampToValueAtTime(0, inicio + duracao)
      envelope.connect(filtro)

      for (const freq of NOTAS) {
        const osc = ctx.createOscillator()
        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(freq, inicio)
        osc.frequency.linearRampToValueAtTime(freq * 0.97, inicio + duracao)
        osc.connect(envelope)
        osc.start(inicio)
        osc.stop(inicio + duracao + 0.02)
      }
    }

    const t0 = ctx.currentTime + 0.02
    toque(t0, 0.2)
    toque(t0 + 0.3, 0.45)
  } catch {
    // Sem som não é problema: a animação segue normalmente
  }
}
