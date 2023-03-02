<?php
ini_set('memory_limit', '-1');
/**
 * Validates and unpads the padded plaintext according to PKCS#7.
 * The resulting plaintext will be 1 to n bytes smaller depending on the amount of padding,
 * where n is the block size.
 *
 * The user is required to make sure that plaintext and padding oracles do not apply,
 * for instance by providing integrity and authenticity to the IV and ciphertext using a HMAC.
 *
 * Note that errors during uppadding may occur if the integrity of the ciphertext
 * is not validated or if the key is incorrect. A wrong key, IV or ciphertext may all
 * lead to errors within this method.
 *
 * The version of PKCS#7 padding used is the one defined in RFC 5652 chapter 6.3.
 * This padding is identical to PKCS#5 padding for 8 byte block ciphers such as DES.
 *
 * @param string padded the padded plaintext encoded as a string containing bytes
 * @param integer $blocksize the block size of the cipher in bytes
 * @return string the unpadded plaintext
 * @throws Exception if the unpadding failed
 */
function pkcs7unpad($padded, $blocksize)
{
  $l = strlen($padded);

  if ($l % $blocksize != 0) {
    throw new Exception("Padded plaintext cannot be divided by the block size");
  }

  $padsize = ord($padded[$l - 1]);

  if ($padsize === 0) {
    throw new Exception("Zero padding found instead of PKCS#7 padding");
  }

  if ($padsize > $blocksize) {
    throw new Exception("Incorrect amount of PKCS#7 padding for blocksize");
  }

  // check the correctness of the padding bytes by counting the occurance
  $padding = substr($padded, -1 * $padsize);
  if (substr_count($padding, chr($padsize)) != $padsize) {
    throw new Exception("Invalid PKCS#7 padding encountered");
  }

  return substr($padded, 0, $l - $padsize);
}

$chippertext = "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";
$iv = "bed001b40c33190e2dd0eef7f6c08bb0";
$passphrase = 'osfh1pD%WkA5Z$Zo';
$encrypted = base64_decode($chippertext);
// echo $encrypted;
// $iv = pack('H*', $iv);
// $test = openssl_decrypt($encrypted, 'aes-256-cbc', $passphrase, OPENSSL_RAW_DATA, $iv);
// var_dump($test);
$json = '{
  "ciphertext": "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",
  "iv": "bed001b40c33190e2dd0eef7f6c08bb0",
  "salt": "f186628682e39e1f"
}';
function decrypt(string $jsonStr, string $passphrase)
{
  $json = json_decode($jsonStr, true);
  $salt = hex2bin($json["salt"]);
  $iv = hex2bin($json["iv"]);
  $ct = base64_decode($json["ciphertext"]);
  $concatedPassphrase = $passphrase . $salt;
  $md5 = [];
  $md5[0] = md5($concatedPassphrase, true);
  $result = $md5[0];
  for ($i = 1; $i < 3; $i++) {
    $md5[$i] = md5($md5[$i - 1] . $concatedPassphrase, true);
    $result .= $md5[$i];
  }
  $key = substr($result, 0, 32);
  $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
  return json_decode($data, true);
}

var_dump(decrypt($json, $passphrase));
