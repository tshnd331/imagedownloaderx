/**
 * Copyright 2024 tshnd331
 * This software is released under the MIT License, see LICENSE.
 */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'download') {
        // URLからnameパラメータを削除
        let url = message.imageUrl;
        if (url.split('?').length == 2) {
            url = url.split('?').shift() + '?' + url.split('?').pop().split('&').filter(arg => !arg.startsWith('name=')).join('&');
        }

        // ファイル名
        let name = url.split('/').pop();
        if (name.split('?').length == 2) {
            // formatパラメータから拡張子を取得し結合
            name.split('?').pop().split('&').forEach((arg) => {
                if (arg.startsWith('format=')) {
                    name = name.split('?').shift() + '.' + arg.split('=').pop();
                }
            });
        }

        // フォルダ名
        chrome.storage.local.get(['folderName'], (result) => {
            // フォルダ名
            if ("folderName" in result && result.folderName.length > 0) {
                // ダウンロード
                chrome.downloads.download({
                    url: url,
                    filename: result.folderName + '/' + name,
                    conflictAction: 'overwrite'
                });
            }
        });
    }
});