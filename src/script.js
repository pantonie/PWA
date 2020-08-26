function handleBurgerClick(){
    console.log('click');
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileLinksContainer');
    const style = burger.className;

    if (style === 'open'){
        burger.classList.remove('open');
        menu.classList.remove('show');
        document.body.style.overflow = "auto";
    } else {
        burger.classList.add('open');
        menu.classList.add('show');
        document.body.style.overflow = "hidden";
    }

}