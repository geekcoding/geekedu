<?php

namespace Site\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class SiteUserBundle extends Bundle
{
	public function getParent()
    {
        return 'FOSUserBundle';
    }
}
