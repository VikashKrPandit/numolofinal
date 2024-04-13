$(window).on('load', function () {
    setTimeout(() => {
        $('#preloader').fadeOut(0);
    }, 100);
})
$(document).ready(function () {
    $(`a[href="${window.location.pathname}"]`).addClass('active');
    $(`a[href="${window.location.pathname}"]`).css('pointerEvents', 'none');
});

$('.back-to-tops').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
    return false;

});

function formatMoney(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

let checkID = $('html').attr('data-change');
let i = 0;
if (checkID == 1) i = 1;
if (checkID == 2) i = 3;
if (checkID == 3) i = 5;
if (checkID == 4) i = 1;
function cownDownTimer() {
    var countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
    setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minute = Math.ceil(minutes % i);
        var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        var seconds2 = Math.floor(((distance % (1000 * 60)) / 1000) % 10);
        var seconds11 = Math.floor((distance % (1000 * 30)) / 10000);
        var seconds21 = Math.floor(((distance % (1000 * 30)) / 1000) % 10);
        if (checkID != 1) {
            $(".time .time-sub:eq(1)").text(minute);
        }

        if (checkID != 4) {
            $(".time .time-sub:eq(2)").text(seconds1);
            $(".time .time-sub:eq(3)").text(seconds2);
        }
        if (checkID == 4) {
            console.log(seconds11)
            console.log(seconds21)
            $(".time .time-sub:eq(2)").text(seconds11);
            $(".time .time-sub:eq(3)").text(seconds21);
        }
    }, 0);
}

cownDownTimer();