<?php
namespace App\Controller;

use App\Controller\AppController;

class ContestsController extends AppController
{
    public function index()
    {
        if ($this->request->is('post')) {
            $rate = $this->request->getData('N');
            $contest = ($rate < 1200) ? 'ABC' : 'ARC';
            $this->set(compact('rate', 'contest'));
        }
    }
}
