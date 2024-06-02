<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class Abc053aController extends AbstractController
{
    #[Route('/abc053a', name: 'abc053a')]
    public function index(): Response
    {
        return $this->render('abc053a.html.twig');
    }
}
