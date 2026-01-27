<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // public function handle(Request $request, Closure $next)
    // {
    //     if (auth()->user() && auth()->user()->role === 'admin') {
    //         return $next($request);
    //     }
    //     return redirect('/dashboard'); // अगर एडमिन नहीं है तो डैशबोर्ड पर भेजें
    // }

    public function handle(Request $request, Closure $next): Response
    {
        // auth()->user() या $request->user() दोनों का उपयोग किया जा सकता है
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        return redirect('/dashboard')->with('error', 'You do not have admin access.');
    }
}
