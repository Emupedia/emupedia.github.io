// region Base64

if (typeof atob === 'undefined') {
	// noinspection DuplicatedCode
	atob = function(input) {
		var str = String(input).replace(/[=]+$/, '');

		if (str.length % 4 === 1) {
			throw "'atob' failed: The string to be decoded is not correctly encoded.";
		}
		// noinspection JSAssignmentUsedAsCondition,CommaExpressionJS,JSUnusedAssignment
		for (var bc = 0, bs, buffer, idx = 0, output = ''; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
			buffer = chars.indexOf(buffer);
		}

		return output;
	}
}

if (typeof btoa === 'undefined') {
	// noinspection DuplicatedCode
	btoa = function(input) {
		var str = String(input);
		// noinspection JSAssignmentUsedAsCondition,CommaExpressionJS
		for (var block, charCode, idx = 0, map = chars, output = ''; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
			charCode = str.charCodeAt(idx += 3 / 4);

			if (charCode > 0xFF) {
				throw "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.";
			}

			// noinspection JSUnusedAssignment
			block = block << 8 | charCode;
		}

		return output;
	}
}

// endregion

window['GITHUB_PRIVATE_KEY'] = atob('LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBMnV4Ulc4NENoZ2VycmJWMGMwWjhaeWlkOU9yMkRhby9COTRHSHFxVzJlWFJucC9PClpZb0x4OGlmbFIrREdQOEZwLzZoc2VVb0hOWFhkZkJLbzB2M2l0TEY4STFvdklYWklkQWlSOTJsbFlUZkxPMmYKS2tGdGZvVDcwNUsrQXRrMWtBMzAzYk9EZ2piY2lWaFZidGF2ZTQ2dlZLUVFwZUJ3cm4xMFZtOGo0WE0vVFIyUAovZW42U20zZ3VSUXViN0hRL2lsOTJ0dmZ0VlNFL1M3Y25vTFp3anZjampKL0thaDV6eHhSNFhFYmlXUDlnL3VLCjFxMFFaU1dzZ28wWmRGZVcyZllJcXQ2SS85ZGw3aVZqRTRRcjU5WGZzTmhTK3JKSlVVVVkyaHp6dlJFRThLK2kKZFBwYkRDSHREM1AycXhSZUJHaHBLYnFmbDhVYk1FaXNacHpsaHdJREFRQUJBb0lCQVFDN2FhTWNuSGU4bGNSNgpxT1JQNnYrRXNGakkybnhacG16ZkowckY1ZlBPQmRnMW0wanQxQWZSdUFZbGV4eVh3WG51SHlYOVROZlNGNTZqCjhGbDFBZ3VnWkYvZlZxOWE5SnExUDZDWk5UNFRpZlFrV2lmdjNLTUh0SUNBMXhhakNaKzQrcm10TVloYmFPdlQKQ0RQYTl4NnkvNnRKSWtxK05pMUFzMVZzeVNoR1R2Vm9sWUtkbmRqL3RxZTNyRzhyVElrMHMrL0YvNW9lbVhQMgpRMFVScE9ybVVMMDEvRDdOS1BnZVpobm11d0d0ZUNFeG81Mlp1UlArQUpZdGRQVU5uTms0T1BHK1Q0alkyU1BRCi9nTjd2R3FwS2JjN2V6amxQN3ZEZzVzYWIwT3hmdDJJbUV1REFyb0RwRDBQMGNFZkJIdHZKN29YTm52UE91RTMKRVNrNGtRQ0JBb0dCQVBKY3RYK0JRdFk0blVheU9vTzBvWjIxeTRiNmNlNXlra3BRNGxDdlpXUEZaYm1sLzV5agozUkt0dHZJbWJxTHlXc05jT2dZNGQ3QU9kckJEQ1hyV3Axdm9vNjlKcSt1Nk1hdUJJRkpYWG5rWDMwUzJOc1p1CmhVbkZTZ1l2dVNldDhabzlaZktnL0FUTyt3UWZmTjl3TGJVbWRUbTAzVC9zZ1M0Smg1TUYvektmQW9HQkFPYzkKOXFJTWxhbDNDbi9BYzhwaGJoRXV3U2tyZDltS3A1SGhxN3VmTXhZNVRtK3VGQTNQUGF2eFZDM3E0VW1TTlpYTwp6NlgrbFltT0wwYk1KZm52dEJHR1B5T21WR3VwY0hLNUZjTjhPdGRtYVV4S08vbldXU202N1dQdWZxd2RhNlFNCnpmNW54S3k1TXdhaC83T0kva1FzWWIvTDliVTFHK3FXVmNieHZvd1pBb0dBUXdKdkREbnBDT0hPV21XYzJCMXgKTWZHNXZEQXlvQUw5ZjU2dGRER0tqdk5kRk45WXRTNTVTVmpPWkZWTDhiR2dkck5oTjZjVk1KQlBNSnpZV2laUApUNUlhNzdRbTNKNDJiWHplT3VYOU1PM3d4VWE4RGxFd2VSMGJRbXFmZnVFUkU5dzErOGVXNXAxenVjZ2E5b3hGCmx2aHpJT2xvNHV1NUs4bG11cmZGdjNFQ2dZQWI5blU5a1ZJRHhSNWk1bTNhR2tBS0dlSkh6VGJYK3BsYTNiUTcKb3Z1MWcwYUY0TUlTRFc2Q3ZWTVZubUtSMS9sYzNUNWs3MDA3N2hLdmQvNWJvKzNkZEtOcjl6QWNPTWdkUjE1bgpYajFyVUxvSS9LMFdBQ0tXRmtHZ3BQVnljTGhVaFN2ZnlNS1N0RzZFTGREUzhBejNSM3FtaTg1eGxET0ZBWnJyCnpNM2krUUtCZ0RLUyt1VGNKTnFCRjZESkpxRkJ2Y3NsYkhQOEZrM0l1a0s0emVBV1I5T0JLaXNKWGp3UDdhT00Kb1p1RU52TGQ2dFYvRk50Y0ZianpPdHdIWG1TZkg4Wkl1b3JpU01YTGF4KzM0NFpBTzFhS2E5MVViT3Y0VXZvWgo1bmVDWXpFVE8xeFhEekc0UEV0M0phSkNBZEZPdUtEZ2VQSy9WdHJwejN5UTMrRVF4OHNGCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t');
window['DROPBOX_TOKEN'] = atob('UncxWEJoSHQzYUFBQUFBQUFBQURVMC1wM3dIT29jckQ3ZGlyNF9aSUNVM0tCZzRxc2t6eUNrYzV1a1VPUHE5Ug==');

(function() {
	var externallyFramed;

	try {
		externallyFramed = top.location.host !== location.host;
	} catch (e) {
		externallyFramed = true;
	}

	if (externallyFramed) {
		top.location = location;
	}
})();