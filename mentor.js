
let serial2 = 0
radio.onDataPacketReceived( ({ serial: serial2, receivedNumber: value }) =>  {
    if (value == 911) {
        basic.showNumber(serial2)
        basic.showIcon(IconNames.Heart)
    }
})
input.onButtonPressed(Button.A, () => {
    basic.showLeds(`
        # . . . #
        # # . # #
        # . # . #
        # . # . #
        # . . . #
        `)
})
radio.setGroup(1)
basic.showLeds(`
    # . . . #
    # # . # #
    # . # . #
    # . # . #
    # . . . #
    `)
