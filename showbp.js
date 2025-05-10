// ==UserScript==
// @name         Show osu! BP Index
// @namespace    http://tampermonkey.net/
// @version      2025-05-10
// @description  Display your BP index on your osu! profile page.
// @author       NaughtyChas
// @tag          osu
// @match        https://osu.ppy.sh/users/*
// @icon         https://github.com/ppy/osu/blob/master/assets/lazer.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addBpNumbers() {
        // Find all 'play-detail-list u-relative'
        const scoreListContainers = document.querySelectorAll('.play-detail-list.u-relative');

        let targetScoreListContainer = null;

        if (scoreListContainers.length >= 2) {
            // There will be three same containers
            // for pinned scores, best plays and #1 scores.
            // Here we are targeting to best plays (
            targetScoreListContainer = scoreListContainers[1];
        }

        if (targetScoreListContainer) {
            const scoreEntries = targetScoreListContainer.querySelectorAll('.play-detail.play-detail--highlightable');

            scoreEntries.forEach((entry, index) => {
                if (!entry.querySelector('.bp-number')) {
                    const bpNumberSpan = document.createElement('span');
                    bpNumberSpan.classList.add('bp-number');
                    bpNumberSpan.textContent = `BP${index + 1}`;

                    bpNumberSpan.style.marginRight = '-10px';
                    bpNumberSpan.style.fontWeight = 'bold';
                    bpNumberSpan.style.color = '#fff';
                    bpNumberSpan.style.minWidth = '40px';
                    bpNumberSpan.style.textAlign = 'left';

                    const firstGroup = entry.querySelector('.play-detail__group--top');

                    if (firstGroup) {
                        firstGroup.prepend(bpNumberSpan);
                    }
                }
            });
        }
    }

    setTimeout(addBpNumbers, 500);
    
    // For scores that are loaded dynamically. 
    // Bro is writing code with defensive measures.
    const observer = new MutationObserver(addBpNumbers);
    observer.observe(document.body, { childList: true, subtree: true });

})();
