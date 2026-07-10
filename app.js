// টেলিগ্রাম ওয়েব অ্যাপ ইনিশিয়ালাইজ করা
const tg = window.Telegram.WebApp;
tg.expand(); // অ্যাপটি পুরো স্ক্রিনে খোলার জন্য

// টেলিগ্রাম থেকে ইউজারের ডাটা নেওয়া
const user = tg.initDataUnsafe?.user;

if (user) {
    document.getElementById('user-name').innerText = `${user.first_name} ${user.last_name || ''}`;
    document.getElementById('user-id').innerText = `ID: ${user.id}`;
    if (user.photo_url) {
        document.getElementById('user-photo').src = user.photo_url;
    }
}

// লোকাল ভ্যারিয়েবল ব্যালেন্সের জন্য
let currentBalance = 52.50;

// ব্যালেন্স আপডেট করার ফাংশন
function updateUI() {
    document.getElementById('balance').innerText = currentBalance.toFixed(2);
    document.getElementById('earned').innerText = currentBalance.toFixed(2);
}

// ডেইলি বোনাস বাটন ক্লিক ইভেন্ট
document.getElementById('daily-bonus-btn').addEventListener('click', () => {
    currentBalance += 2.00; // ২ টাকা বোনাস
    updateUI();
    tg.showAlert("অভিনন্দন! আপনি ২ টাকা ডেইলি বোনাস পেয়েছেন।");
});

// অ্যাড দেখার ফাংশন
function watchAd(slotId, amount) {
    tg.showConfirm(`আপনি কি Ad Slot ${slotId} দেখে ${amount} TK আর্ন করতে চান?`, (confirmed) => {
        if (confirmed) {
            // এখানে ভবিষ্যতে আপনার অ্যাড নেটওয়ার্কের (যেমন- Monetag/Adsterra) কোড বসবে
            currentBalance += amount;
            updateUI();
            tg.showAlert(`Ad ${slotId} দেখা সম্পন্ন হয়েছে! +${amount} TK যোগ করা হয়েছে।`);
        }
    });
}
