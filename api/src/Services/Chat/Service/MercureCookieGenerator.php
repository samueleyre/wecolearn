<?php



namespace App\Services\Chat\Service;

use App\Services\User\Entity\User;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha384;
use Lcobucci\JWT\Signer\Key;
use Symfony\Component\HttpFoundation\Cookie;

/*
 * todo: add salt to token ! see mercure doc
 */
class MercureCookieGenerator
{
    private string $secret;
    private string $domain;

    public function __construct(string $secret, string $domain)
    {
        $this->secret = $secret;
        $this->domain = str_contains($domain, 'localhost') ? "http://$domain" : "https://$domain";

    }

    /*
     * @return Cookie
     */
    public function generate(User $user): Cookie
    {
        $token = (new Builder())
            ->withClaim('mercure', ['subscribe'=> ["{$this->domain}/message/{$user->getId()}"]])
            ->getToken(new Sha384(), new Key($this->secret));

        return new Cookie(
            "mercureAuthorization",
            $token,
            strtotime('+1 year'),
            '/',
            strpos($this->domain, 'localhost') !== false ? 'localhost' : 'wecolearn.com'
        );
    }
}
