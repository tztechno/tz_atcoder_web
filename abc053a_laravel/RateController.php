<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RateController extends Controller
{
    public function index()
    {
        return view('rate');
    }

    public function store(Request $request)
    {
        $N = $request->input('N', 1200); // フォームからのレートの取得
        $ANS = ($N < 1200) ? "ABC" : "ARC"; // 条件分岐
        return view('rate', ['N' => $N, 'ANS' => $ANS]); // 結果の表示
    }
}
