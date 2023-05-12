<?php

namespace App\Http\Controllers;

use App\Models\Lender;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{

    function test()
    {
        return response()->json(['nice' => 1]);
    }
    function register()
    {
        try {
            $data = $this->validateData([
                'name' => 'required|max:255',
                'email' => 'required|max:255|unique:users|email',
                'password' => ['required', Password::defaults()],
            ]);

            if ($data) {
                return ['data' => $data];
            }
            $user = new User();
            $user->name = request()->name;
            $user->email = request()->email;
            $user->password = Hash::make(request()->password);
            $user->is_lended = false;
            $user->is_borrowed = false;
            $user->money = 0;
            $user->borrowed = 0;
            $user->lended = 0;
            $user->save();

            $expiration = now()->addMinutes(config('sanctum.expiration'));
            $data['expiration'] = $expiration;
            $data['token'] = $user->createToken('ACCESSTOKEN', ['expiration' => $expiration],  $expiration)->plainTextToken;
            $data['user'] = $user;
            $data['success'] = true;
        } catch (\Throwable $th) {
            $data['success'] =  false;
            $data['errors'] =  'The email has already been taken' . $th;
        }
        return response()->json(['data' => $data]);
    }

    public function login()
    {
        try {
            $data = $this->validateData(['email' => 'required|email', 'password' => ['required', Password::defaults()]]);
            $user = User::where('email', request()->email)->first();
            if ($user && Hash::check(request()->password, $user->password)) {
                $expiration = now()->addMinutes(config('sanctum.expiration'));
                $data['expiration'] = $expiration;
                $data['token'] = $user->createToken('ACCESSTOKEN', ['expiration' => $expiration],  $expiration)->plainTextToken;
                $data['user'] = $user;
                $data['success'] = true;
            } else {
                $data['success'] = false;
                $data['errors'] = 'Incorrect email or password.';
            }
        } catch (\Throwable $th) {
            $data['success'] =  false;
            $data['errors'] =  $th . 'error occur in catch';
        }
        return response()->json(['data' => $data]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return response()->json(['message' => 'you are now logout.']);
    }

    public function add_money()
    {
        $request_money = request()->money;
        if ($request_money > 1000000000) {
            return response()->json(['success' => false, 'field' => 'money', 'message' => 'Please enter a value less than or equal to 1 billion.']);
        } else {
            $user = Auth::user();
            $user->money += $request_money;
            $user->save();
            return response()->json(['success' => true, 'user' => $user]);
        }
    }

    public function upload(Request $request)
    {
        $image = $request->file('image');
        $filename = $image->getClientOriginalName();
        $path = $image->store('public/images');
        $url = Storage::url($path);

        $user = Auth::user();
        $user->avatar = $url;
        $user->save();

        $lender = Lender::where('user_id', $user->id)->first();
        if ($lender) {
            $lender->lender_avatar = $url;
            $lender->save();
        }
        return response()->json([
            'filename' => $filename,
            'url' => $url,
            'user' => $user,
            'val' => request()->val
        ]);
    }

    public function validateData(array $rules)
    {

        $validator = Validator::make(request()->all(), $rules);
        if ($validator->fails()) {
            $data['success'] = false;
            $data['errors'] = $validator->errors();
            $fieldNames = $data['errors']->keys();
            $errorMessages = $data['errors']->all();
            $data['field'] = $fieldNames[0];
            $data['message'] = $errorMessages[0];
            return $data;
        }
    }
}
