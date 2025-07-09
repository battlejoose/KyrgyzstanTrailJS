// Async wrapper for Oregon Trail to work in the browser
// This wraps the original game code to handle async operations

// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', async () => {
    // Give time for all scripts to initialize
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.putmsg('Loading Oregon Trail...\n\n');
    
    // Load the original game code as text and modify it
    try {
        const response = await fetch('oregontrail.js');
        let gameCode = await response.text();
        
        // Fix the initial displayScores and displayGraves calls
        gameCode = gameCode.replace(
            'displayScores();\n\nvar tombStones',
            'await displayScores();\n\nvar tombStones'
        );
        
        gameCode = gameCode.replace(
            'displayGraves();\nconsole.pause();\nconsole.clear();',
            'await displayGraves();\nawait console.pause();\nconsole.clear();'
        );
        
        // Replace synchronous console operations with async ones
        gameCode = gameCode
            .replace(/console\.pause\(\)/g, 'await console.pause()')
            .replace(/console\.getstr\(/g, 'await console.getstr(')
            .replace(/console\.getnum\(/g, 'await console.getnum(')
            .replace(/function displayScores\(\)/g, 'async function displayScores()')
            .replace(/function displayGraves\(\)/g, 'async function displayGraves()')
            .replace(/function OregonTrail\(\)/g, 'async function OregonTrail()')
            .replace(/function firstPrompt\(\)/g, 'async function firstPrompt()')
            .replace(/function instructions\(\)/g, 'async function instructions()')
            .replace(/function rifleSkills\(\)/g, 'async function rifleSkills()')
            .replace(/function getAnimals\(\)/g, 'async function getAnimals()')
            .replace(/function getFood\(\)/g, 'async function getFood()')
            .replace(/function getAmmo\(\)/g, 'async function getAmmo()')
            .replace(/function getClothing\(\)/g, 'async function getClothing()')
            .replace(/function getSupplies\(\)/g, 'async function getSupplies()')
            .replace(/function initialPurchase\(\)/g, 'async function initialPurchase()')
            .replace(/function anotherPurchase\(\)/g, 'async function anotherPurchase()')
            .replace(/function calculateCosts\(\)/g, 'async function calculateCosts()')
            .replace(/function inventoryCheck\(\)/g, 'async function inventoryCheck()')
            .replace(/function doctorVisit\(\)/g, 'async function doctorVisit()')
            .replace(/function turnStart\(\)/g, 'async function turnStart()')
            .replace(/function firstTurn\(\)/g, 'async function firstTurn()')
            .replace(/function turnCheck\(\)/g, 'async function turnCheck()')
            .replace(/function cantAffordDoctor\(\)/g, 'async function cantAffordDoctor()')
            .replace(/function turnChoice\(\)/g, 'async function turnChoice()')
            .replace(/function southPassFlagCheck\(\)/g, 'async function southPassFlagCheck()')
            .replace(/function fortHuntContinue\(\)/g, 'async function fortHuntContinue()')
            .replace(/function fortBuy\(\)/g, 'async function fortBuy()')
            .replace(/function goHunting\(\)/g, 'async function goHunting()')
            .replace(/function shootingSub\(\)/g, 'async function shootingSub()')
            .replace(/function bangResponseCheck\(\)/g, 'async function bangResponseCheck()')
            .replace(/function checkFoodAMT\(\)/g, 'async function checkFoodAMT()')
            .replace(/function eatChoice\(\)/g, 'async function eatChoice()')
            .replace(/function actionEvaluate\(\)/g, 'async function actionEvaluate()')
            .replace(/function riders\(\)/g, 'async function riders()')
            .replace(/function milesAfterRiders\(\)/g, 'async function milesAfterRiders()')
            .replace(/function ridersNoAttack\(\)/g, 'async function ridersNoAttack()')
            .replace(/function riderHostilityCheck\(\)/g, 'async function riderHostilityCheck()')
            .replace(/function attackRiders\(\)/g, 'async function attackRiders()')
            .replace(/function showSupplies\(\)/g, 'async function showSupplies()')
            .replace(/function setFortAmtSubroutine\(\)/g, 'async function setFortAmtSubroutine()')
            .replace(/function foodFortCycle\(\)/g, 'async function foodFortCycle()')
            .replace(/function ammoFortCycle\(\)/g, 'async function ammoFortCycle()')
            .replace(/function clothingFortCycle\(\)/g, 'async function clothingFortCycle()')
            .replace(/function supplyFortCycle\(\)/g, 'async function supplyFortCycle()')
            .replace(/function shotInLeg\(\)/g, 'async function shotInLeg()')
            .replace(/function eventSelector\(\)/g, 'async function eventSelector()')
            .replace(/function advanceEventCounter\(\)/g, 'async function advanceEventCounter()')
            .replace(/function secondSwitch\(\)/g, 'async function secondSwitch()')
            .replace(/function mountains\(\)/g, 'async function mountains()')
            .replace(/function checkSouthPass\(\)/g, 'async function checkSouthPass()')
            .replace(/function slowGoing\(\)/g, 'async function slowGoing()')
            .replace(/function checkMileage17hundred\(\)/g, 'async function checkMileage17hundred()')
            .replace(/function checkMileageNine50\(\)/g, 'async function checkMileageNine50()')
            .replace(/function blizzard\(\)/g, 'async function blizzard()')
            .replace(/function starve\(\)/g, 'async function starve()')
            .replace(/function outOfMedicalSupplies\(\)/g, 'async function outOfMedicalSupplies()')
            .replace(/function youDiedOf\(\)/g, 'async function youDiedOf()')
            .replace(/function injuries\(\)/g, 'async function injuries()')
            .replace(/function formalities\(\)/g, 'async function formalities()')
            .replace(/function digGrave\(\)/g, 'async function digGrave()')
            .replace(/function telegraph\(\)/g, 'async function telegraph()')
            .replace(/function finalTurn\(\)/g, 'async function finalTurn()')
            .replace(/function newHighScore\(\)/g, 'async function newHighScore()')
            .replace(/function illnessSubroutine\(\)/g, 'async function illnessSubroutine()')
            .replace(/function hailStorm\(\)/g, 'async function hailStorm()')
            .replace(/function warmEnough\(\)/g, 'async function warmEnough()')
            .replace(/function coldWeather\(\)/g, 'async function coldWeather()')
            .replace(/function wildBangResponse\(\)/g, 'async function wildBangResponse()')
            .replace(/function slowDraw\(\)/g, 'async function slowDraw()')
            .replace(/function quickestDraw\(\)/g, 'async function quickestDraw()')
            .replace(/function finalMonth\(\)/g, 'async function finalMonth()')
            .replace(/function checkSupplies\(\)/g, 'async function checkSupplies()')
            .replace(/function misfire\(\)/g, 'async function misfire()');
        
        // Add await to function calls (with word boundaries to avoid partial matches)
        gameCode = gameCode
            .replace(/\bdisplayScores\(\);/g, 'await displayScores();')
            .replace(/\bdisplayGraves\(\);/g, 'await displayGraves();')
            .replace(/\bfirstPrompt\(\);/g, 'await firstPrompt();')
            .replace(/\binstructions\(\);/g, 'await instructions();')
            .replace(/\brifleSkills\(\);/g, 'await rifleSkills();')
            .replace(/\bgetAnimals\(\);/g, 'await getAnimals();')
            .replace(/\bgetFood\(\);/g, 'await getFood();')
            .replace(/\bgetAmmo\(\);/g, 'await getAmmo();')
            .replace(/\bgetClothing\(\);/g, 'await getClothing();')
            .replace(/\bgetSupplies\(\);/g, 'await getSupplies();')
            .replace(/\binitialPurchase\(\);/g, 'await initialPurchase();')
            .replace(/\banotherPurchase\(\);/g, 'await anotherPurchase();')
            .replace(/\bcalculateCosts\(\);/g, 'await calculateCosts();')
            .replace(/\binventoryCheck\(\);/g, 'await inventoryCheck();')
            .replace(/\bdoctorVisit\(\);/g, 'await doctorVisit();')
            .replace(/\bturnStart\(\);/g, 'await turnStart();')
            .replace(/\bfirstTurn\(\);/g, 'await firstTurn();')
            .replace(/\bturnCheck\(\);/g, 'await turnCheck();')
            .replace(/\bcantAffordDoctor\(\);/g, 'await cantAffordDoctor();')
            .replace(/\bturnChoice\(\);/g, 'await turnChoice();')
            .replace(/\bsouthPassFlagCheck\(\);/g, 'await southPassFlagCheck();')
            .replace(/\bfortHuntContinue\(\);/g, 'await fortHuntContinue();')
            .replace(/\bfortBuy\(\);/g, 'await fortBuy();')
            .replace(/\bgoHunting\(\);/g, 'await goHunting();')
            .replace(/\bshootingSub\(\);/g, 'await shootingSub();')
            .replace(/\bbangResponseCheck\(\);/g, 'await bangResponseCheck();')
            .replace(/\bcheckFoodAMT\(\);/g, 'await checkFoodAMT();')
            .replace(/\beatChoice\(\);/g, 'await eatChoice();')
            .replace(/\bactionEvaluate\(\);/g, 'await actionEvaluate();')
            .replace(/\briders\(\);/g, 'await riders();')
            .replace(/\bmilesAfterRiders\(\);/g, 'await milesAfterRiders();')
            .replace(/\bridersNoAttack\(\);/g, 'await ridersNoAttack();')
            .replace(/\briderHostilityCheck\(\);/g, 'await riderHostilityCheck();')
            .replace(/\battackRiders\(\);/g, 'await attackRiders();')
            .replace(/\bshowSupplies\(\);/g, 'await showSupplies();')
            .replace(/\bsetFortAmtSubroutine\(\);/g, 'await setFortAmtSubroutine();')
            .replace(/\bfoodFortCycle\(\);/g, 'await foodFortCycle();')
            .replace(/\bammoFortCycle\(\);/g, 'await ammoFortCycle();')
            .replace(/\bclothingFortCycle\(\);/g, 'await clothingFortCycle();')
            .replace(/\bsupplyFortCycle\(\);/g, 'await supplyFortCycle();')
            .replace(/\bshotInLeg\(\);/g, 'await shotInLeg();')
            .replace(/\beventSelector\(\);/g, 'await eventSelector();')
            .replace(/\badvanceEventCounter\(\);/g, 'await advanceEventCounter();')
            .replace(/\bsecondSwitch\(\);/g, 'await secondSwitch();')
            .replace(/\bmountains\(\);/g, 'await mountains();')
            .replace(/\bcheckSouthPass\(\);/g, 'await checkSouthPass();')
            .replace(/\bslowGoing\(\);/g, 'await slowGoing();')
            .replace(/\bcheckMileage17hundred\(\);/g, 'await checkMileage17hundred();')
            .replace(/\bcheckMileageNine50\(\);/g, 'await checkMileageNine50();')
            .replace(/\bblizzard\(\);/g, 'await blizzard();')
            .replace(/\bstarve\(\);/g, 'await starve();')
            .replace(/\boutOfMedicalSupplies\(\);/g, 'await outOfMedicalSupplies();')
            .replace(/\byouDiedOf\(\);/g, 'await youDiedOf();')
            .replace(/\binjuries\(\);/g, 'await injuries();')
            .replace(/\bformalities\(\);/g, 'await formalities();')
            .replace(/\bdigGrave\(\);/g, 'await digGrave();')
            .replace(/\btelegraph\(\);/g, 'await telegraph();')
            .replace(/\bfinalTurn\(\);/g, 'await finalTurn();')
            .replace(/\bnewHighScore\(\);/g, 'await newHighScore();')
            .replace(/\billnessSubroutine\(\);/g, 'await illnessSubroutine();')
            .replace(/\bhailStorm\(\);/g, 'await hailStorm();')
            .replace(/\bwarmEnough\(\);/g, 'await warmEnough();')
            .replace(/\bcoldWeather\(\);/g, 'await coldWeather();')
            .replace(/\bwildBangResponse\(\);/g, 'await wildBangResponse();')
            .replace(/\bslowDraw\(\);/g, 'await slowDraw();')
            .replace(/\bquickestDraw\(\);/g, 'await quickestDraw();')
            .replace(/\bfinalMonth\(\);/g, 'await finalMonth();')
            .replace(/\bcheckSupplies\(\);/g, 'await checkSupplies();')
            .replace(/\bmisfire\(\);/g, 'await misfire();');
        
        // Wrap the main execution in an async function
        gameCode = `
(async function() {
    ${gameCode}
    
    // Start the game
    await displayScores();
    await displayGraves();
    await console.pause();
    console.clear();
    await OregonTrail();
})();
`;
        
        // Remove any existing OregonTrail() calls
        gameCode = gameCode.replace(/^OregonTrail\(\);?$/gm, '');
        
        // Create a new script element with the modified code
        const script = document.createElement('script');
        script.textContent = gameCode;
        document.body.appendChild(script);
        
    } catch (error) {
        console.putmsg('\\1h\\1rError loading game: ' + error.message + '\\n');
        console.putmsg('Please check that oregontrail.js is in the same directory.\\n');
        console.putmsg('\\n\\nError details: ' + error.stack + '\\n');
    }
}); 