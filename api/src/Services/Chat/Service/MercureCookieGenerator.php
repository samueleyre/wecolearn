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
    private $secret;

    public function __construct(string $secret, string $domain)
    {
        $this->secret = $secret;
        $this->domain = $domain;
    }

    /*
     * @return Cookie
     */
    public function generate(User $user)
    {
        $token = (new Builder())
            ->withClaim('mercure', ['subscribe'=> ["https://{$this->domain}/message/{$user->getId()}"]])
            ->getToken(new Sha384(), new Key($this->secret));

        return new Cookie(
            "mercureAuthorization",
            $token,
            strtotime('+1 year'),
            '/'
//            strpos($this->domain, 'localhost') !== false ? 'localhost' : $this->domain // port not accepted for cookie domain
        );
    }

}
