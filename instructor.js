let num_to_show = 0
let D_count = 0
let C_count = 0
let B_count = 0
let A_count = 0
let fast_count = 0
let slow_count = 0
let normal_count = 0
let button_A_state = 0
let button_B_state = 0
let qamode = 0
let max = 4

radio.setGroup(1)
serial.writeLine("started")

input.onButtonPressed(Button.A, () => {
    // starting questionaire
    if (button_A_state == 0) {
        radio.sendNumber(101)
        button_A_state = 1
        serial.writeLine("qastarted")
        basic.showLeds(`
            . # # # .
            . . # . .
            . . # . .
            . . # . .
            . # # # .
            `)
    } else {
        button_A_state = 0
        radio.sendNumber(100)
        serial.writeLine("Results " + "A" + A_count + "B" + B_count + "C" + C_count + "D" + D_count)
        // draw a graph with the A,B,C,D content
        A_count = 0
        B_count = 0
        C_count = 0
        D_count = 0
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
radio.onDataPacketReceived(({ receivedNumber }) => {
    // Initial case
    if (receivedNumber == 9) {
        normal_count += 1

        for (let i = 0; i < 5; i++) {
            led.unplot(0, i)
            led.unplot(2, i)
            led.unplot(4, i)
        }

        for (let i = 0; i < normal_count; i++) {
            if (normal_count == 5)
                break;
            led.plot(2, max - i)
        }
    }
    // Slow
    if (receivedNumber == 10) {
        slow_count += 1
        normal_count += -1

        for (let i = 0; i < 5; i++) {
            led.unplot(2, i)
            led.unplot(4, i)
        }

        for (let i = 0; i < normal_count; i++) {
            if (normal_count == 5)
                break;
            led.plot(2, max - i)
        }

        for (let i = 0; i < slow_count; i++) {
            if (slow_count == 5)
                break;
            led.plot(4, max - i)
        }







    }
    // Fast
    if (receivedNumber == 12) {
        fast_count += 1
        slow_count += -1

        for (let i = 0; i < 5; i++) {
            led.unplot(4, i)
            led.unplot(0, i)
        }

        for (let i = 0; i < slow_count; i++) {
            if (slow_count == 5)
                break;
            led.plot(4, max - i)
        }

        for (let i = 0; i < fast_count; i++) {
            if (fast_count == 5)
                break;
            led.plot(0, max - i)
        }
    }
    // normal
    if (receivedNumber == 11) {
        normal_count += 1
        fast_count += -1

        for (let i = 0; i < 5; i++) {
            led.unplot(0,i)
            led.unplot(2,i)
        }

        for (let i = 0; i < fast_count; i++) {
            if (fast_count == 5)
                break;
            led.plot(0, max - i)
        }

        for (let i = 0; i < normal_count; i++) {
            if (normal_count == 5)
                break;
            led.plot(2, max - i)
        }
    }
    if (receivedNumber == 21) {
        A_count += 1
        qamode = 1
    }
    if (receivedNumber == 22) {
        B_count += 1
        qamode = 1
    }
    if (receivedNumber == 23) {
        C_count += 1
        qamode = 1
    }
    if (receivedNumber == 24) {
        D_count += 1
        qamode = 1
    }

    if (qamode == 0) {
        num_to_show = fast_count - slow_count
        serial.writeLine("Pace " + num_to_show)
    }

    qamode = 0
})


