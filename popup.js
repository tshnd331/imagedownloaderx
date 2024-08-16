/**
 * Copyright 2024 tshnd331
 * This software is released under the MIT License, see LICENSE.
 */

window.onload = (event) => {
    // バージョン
    document.getElementById('version').innerText = "ver" + chrome.runtime.getManifest().version;

    chrome.storage.local.get(['folderName'], (result) => {
        // フォルダ名
        if ("folderName" in result) {
            document.getElementById('folder-name').value = result.folderName;
        }
    });
};

document.getElementById('save-button').addEventListener('click', (event) => {
    // ボタンを無効化
    event.target.classList.add('disabled');

    // フォルダ名を取得
    const folderName = document.getElementById('folder-name').value;

    // フォルダ名のバリデーションチェック
    if (folderName.match(/[\\\/:\*\?\"<>\|]/)) {
        // ポップアップ表示
        document.getElementById('failed-message').innerText = '無効な文字が含まれています';
        const toast = new bootstrap.Toast(document.querySelector('.toast.myFailed')).show();

        // ボタン有効化
        event.target.classList.remove('disabled');

        return;
    }

    const settings = {
        folderName: folderName,
    };

    // 設定情報を保存
    chrome.storage.local.set(settings, () => {
        // ポップアップ表示
        const toast = new bootstrap.Toast(document.querySelector('.toast.mySuccess')).show();

        // ボタン有効化
        event.target.classList.remove('disabled');
    });
});