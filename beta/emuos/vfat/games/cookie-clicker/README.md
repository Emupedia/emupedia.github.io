# cookieclicker

<img src="img/perfectCookie.png" width="128">

The original game can be found at http://orteil.dashnet.org/cookieclicker/

This mirror for, errrr, like, educational purpose, either to download for your own offline education or to be played online from http://ozh.github.io/cookieclicker/ if you cannot "educate" yourself on the original URL

### How to update

If the original game updates, here is how you can update the mirror:

#### 1. Fetch all new images :

from the `/img/` directory :

* `wget --convert-links -O index.html http://orteil.dashnet.org/cookieclicker/img/`
* `grep -o 'href="[^/?"]*' index.html | sed 's/href="//' | sed 's/Thumbs.db//' | sed '/^[[:space:]]*$/d'> list.txt`
* `wget -N -i list.txt -B http://orteil.dashnet.org/cookieclicker/img/`

#### 2. Fetch all new sounds :

Similarly, from the `/snd/` directory :

* `wget --convert-links -O index.html http://orteil.dashnet.org/cookieclicker/snd/`
* `grep -o 'href="[^/?"]*' index.html | sed 's/href="//' | sed 's/Thumbs.db//' | sed '/^[[:space:]]*$/d'> list.txt`
* `wget -N -i list.txt -B http://orteil.dashnet.org/cookieclicker/snd/`

#### 3. Update `js` and `html` files :

From the root directory :

* Fetch updated `js` files : `wget -N -i list.txt -B http://orteil.dashnet.org/cookieclicker/`
* Fetch the updated `index.html` file
* Scan `index.html` for any new `<script src` and also `main.js` for any new local javascript (eg `Game.last.minigameUrl`)

#### 4. Report update here :)

If you happen to update, please make a pull request for others to benefit, thanks!
