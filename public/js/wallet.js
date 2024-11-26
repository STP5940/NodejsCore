document.getElementById("connectWalletBtn").addEventListener("click", async () => {
    // const loadingSpinner = document.getElementById("loadingSpinner");
    const walletAddress = localStorage.getItem("walletAddress");
    const walletInfo = document.getElementById("walletInfo");
    const walletAddressBtn = document.getElementById("walletAddressBtn");
    const connectWalletBtn = document.getElementById("connectWalletBtn");

    // loadingSpinner.style.display = "block";
    // showLoading();
    walletInfo.innerText = "Loading..."; // Clear wallet balance

    if (!window.ethereum) {
        // alert("กรุณาติดตั้ง Metamask หรือ Wallet ที่รองรับ");
        Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: `กรุณาติดตั้ง Metamask หรือ Wallet ที่รองรับ`,
            icon: 'error', // Information icon
            confirmButtonText: 'ตกลง',
        });

        walletInfo.innerText = "Hello World"; // Clear wallet balance
        // loadingSpinner.style.display = "none";
        // hideLoading();
        return;
    }

    if (walletAddress) {
        // Clear localStorage and reset UI
        localStorage.removeItem("walletAddress");

        walletAddressBtn.style.display = "none"; // Hide wallet address button
        walletInfo.innerText = "Hello World"; // Clear wallet balance

        connectWalletBtn.disabled = false;
        connectWalletBtn.innerText = "Connect wallet";
        connectWalletBtn.style.background = "linear-gradient(90deg, #FF77B4, #FF9B9B)";; // Reset background color
        // loadingSpinner.style.display = "none";
        // hideLoading();
        return;
    }

    const web3 = new Web3(window.ethereum);

    const KUB_CHAIN_ID = "0x6545"; // Bitkub testnet Hexadecimal for 25925
    // const KUB_CHAIN_ID = "0x60"; // Bitkub mainnet Hexadecimal for 96

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        const walletAddr = accounts[0];
        const shortAddr = `${walletAddr.slice(0, 6)}...${walletAddr.slice(-4)}`;

        // เก็บที่อยู่กระเป๋าใน localStorage
        localStorage.setItem("walletAddress", walletAddr);

        walletAddressBtn.innerText = `${shortAddr}`;
        walletAddressBtn.style.display = "inline-block"; // แสดงปุ่ม

        const currentChainId = await web3.eth.getChainId();
        if (currentChainId !== parseInt(KUB_CHAIN_ID, 16)) {
            alert("กรุณาเปลี่ยน Network เป็น Bitkub Chain");
            // loadingSpinner.style.display = "none";
            // hideLoading();
            return;
        }

        const balance = await web3.eth.getBalance(walletAddr);
        const kubBalance = web3.utils.fromWei(balance, "ether");
        const symbol = await getNativeCurrencySymbol()

        // Limit to 4 decimal places
        const formattedBalance = kubBalance.split('.')[0] + '.' + kubBalance.split('.')[1]?.slice(0, 4);
        walletInfo.innerText = `Balance: ${formattedBalance} ${symbol}`;

        // connectWalletBtn.disabled = true;
        connectWalletBtn.innerText = "Connected";
        connectWalletBtn.style.background = "#FF5252";
        // connectWalletBtn.style.cursor = "not-allowed";

    } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("ไม่สามารถเชื่อมต่อ Wallet ได้");
        // Swal.fire({
        //     title: 'เกิดข้อผิดพลาด',
        //     text: `ไม่สามารถเชื่อมต่อ Wallet ได้`,
        //     icon: 'error', // Information icon
        //     confirmButtonText: 'ตกลง',
        //   });
    } finally {
        // loadingSpinner.style.display = "none";
        // hideLoading();
    }
});

// ซ่อนปุ่ม walletAddressBtn ตอนที่เริ่มต้น
document.getElementById("walletAddressBtn").style.display = "none";
// loadingSpinner.style.display = "block";
// showLoading();

window.addEventListener("load", async () => {

    const walletAddress = localStorage.getItem("walletAddress");
    const walletInfo = document.getElementById("walletInfo");
    const walletAddressBtn = document.getElementById("walletAddressBtn");
    const connectWalletBtn = document.getElementById("connectWalletBtn");

    if (walletAddress) {
        // ถ้ามีที่อยู่กระเป๋าใน localStorage, แสดงที่อยู่กระเป๋า
        const shortAddr = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
        walletAddressBtn.innerText = shortAddr;
        walletAddressBtn.style.display = "inline-block"; // แสดงปุ่ม

        // connectWalletBtn.disabled = true;
        connectWalletBtn.innerText = "Connected";
        connectWalletBtn.style.background = "#FF5252";
        // connectWalletBtn.style.cursor = "not-allowed";

        // ใช้ Web3 เพื่อตรวจสอบยอดเหรียญในกระเป๋าหลังจากโหลดหน้าเว็บ
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(walletAddress);
        const kubBalance = web3.utils.fromWei(balance, "ether");
        const symbol = await getNativeCurrencySymbol()

        // Limit to 4 decimal places
        const formattedBalance = kubBalance.split('.')[0] + '.' + kubBalance.split('.')[1]?.slice(0, 4);
        walletInfo.innerText = `Balance: ${formattedBalance} ${symbol}`;
    } else {
        walletInfo.innerText = "Hello World"; // Clear wallet balance
    }

    // loadingSpinner.style.display = "none";
    // hideLoading();
});

async function getNativeCurrencySymbol() {
    try {
        const web3 = new Web3(window.ethereum);
        const chainId = await web3.eth.getChainId(); // Get the current chain ID
        let symbol;

        // Check for the mainnet (Ethereum or Bitkub)
        if (chainId === 1) { // Ethereum mainnet
            symbol = "ETH";
        } else if (chainId === 25925) { // Bitkub Chain mainnet (replace with actual chain ID if needed)
            symbol = "TKUB";
        } else if (chainId === 96) { // Bitkub Chain mainnet (replace with actual chain ID if needed)
            symbol = "KUB";
        } else {
            symbol = "Unknown Network";
        }

        // console.log("Native Currency Symbol:", symbol);
        return symbol;

    } catch (error) {
        console.error("Error getting native currency symbol:", error);
    }
}

// แสดงเลเยอร์โหลด
// function showLoading() {
//     document.querySelector('.loading-overlay').style.display = 'flex';
// }

// ซ่อนเลเยอร์โหลด
// function hideLoading() {
//     document.querySelector('.loading-overlay').style.display = 'none';
// }