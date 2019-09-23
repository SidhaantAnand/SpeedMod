let answer_result = 0
let send_pace = 0
let answer_click = 0
let pace_result = 0
let qa_mode = 0
let help_mode = 0
let pace_click = 0
input.onButtonPressed(Button.A, () => {
    if (qa_mode == 0) {
        pace_click += 1
        if (pace_click > 3) {
            pace_click = 1
        }
        if (pace_click == 1) {
            basic.showArrow(ArrowNames.South)
            pace_result = 10
            radio.sendNumber(10)
        }
        if (pace_click == 2) {
            basic.showArrow(ArrowNames.North)
            pace_result = 12
            radio.sendNumber(12)
        }
        if (pace_click == 3) {
            basic.showIcon(IconNames.Happy)
            pace_result = 11
            radio.sendNumber(11)
        }
    }
    if (qa_mode == 1) {
        answer_click += 1
        if (answer_click > 4) {
            answer_click = 1
        }
        if (answer_click == 1) {
            basic.showString("A")
            answer_result = 21
        }
        if (answer_click == 2) {
            basic.showString("B")
            answer_result = 22
        }
        if (answer_click == 3) {
            basic.showString("C")
            answer_result = 23
        }
        if (answer_click == 4) {
            basic.showString("D")
            answer_result = 24
        }
    }
})
input.onButtonPressed(Button.B, () => {
    if (qa_mode == 0 && help_mode == 0) {
        help_mode = 1
        radio.sendNumber(911)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        if (qa_mode == 0 && help_mode == 1) {
            help_mode = 0
            basic.showIcon(IconNames.Happy)
        }
    }
    if (qa_mode == 1 && help_mode == 0) {
        radio.sendNumber(answer_result)
        answer_click = 0
        basic.showIcon(IconNames.Happy)
    }
})
radio.onDataPacketReceived( ({ receivedNumber }) =>  {
    if (receivedNumber == 101) {
        qa_mode = 1
        answer_click = 0
    }
    if (receivedNumber == 100) {
        qa_mode = 0
        basic.showIcon(IconNames.Happy)
    }
})
radio.setGroup(1)
pace_click = 0
pace_result = 0
send_pace = 0
radio.sendNumber(9)
radio.setTransmitSerialNumber(true)
basic.showIcon(IconNames.Happy)
qa_mode = 0
help_mode = 0
answer_click = 0
answer_result = 0
serial.writeNumber(control.deviceSerialNumber())
basic.forever(() => {
	
})
