/**
 * Copyright 2024 tshnd331
 * This software is released under the MIT License, see LICENSE.
 */

function sendMessageToBackground(imageUrl) {
    chrome.runtime.sendMessage({
        action: 'download',
        imageUrl: imageUrl
    });
}
  
window.addEventListener('load', function(e) {
    window.addEventListener('click', function(event) {
        if (!event.target) return;

        // 押したいいねボタン取得
        const like = event.target.closest('button[data-testid="like"]');
        if (!like) return;

        // 押したいいねボタンが属するツイートを束ねるdiv要素取得
        const cellInnerDiv = like.closest('div[data-testid="cellInnerDiv"]');
        if (cellInnerDiv) {
            // そのツイートに含まれる全画像取得
            cellInnerDiv.querySelectorAll('div[data-testid="tweetPhoto"] img').forEach((img) => {
                setTimeout(sendMessageToBackground, 500, img.src);
            });
        } else {
            // 画像表示中のモーダルを取得
            const modalHeader = like.closest('div[aria-labelledby="modal-header"]');
            if (!modalHeader) return;

            // そのモーダルに含まれる全画像取得
            modalHeader.querySelectorAll('div[data-testid="swipe-to-dismiss"] img').forEach((img) => {
                setTimeout(sendMessageToBackground, 500, img.src);
            })
        }
    }, {capture: true});
});