<?php



namespace App\Services\Chat\Service;

use App\Services\User\Entity\User;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha384;
use Symfony\Component\HttpFoundation\Cookie;

class MercureCookieGenerator
{
    private $secret;

    public function __construct(string $secret, string $domain)
    {
        $this->secret = $secret;
        $this->domain = $domain;
    }

    public function generate(User $user)
    {
        $token = (new Builder())
            ->set('mercure', ['subscribe'=> ["https://{$this->domain}/message/{$user->getId()}"]])
            ->sign(new Sha384(), $this->secret)
            ->getToken();

        $cookie = new Cookie("mercureAuthorization", $token, strtotime('+5 day'), '/', "{$this->domain}");

        return $cookie->__toString();
    }
}
