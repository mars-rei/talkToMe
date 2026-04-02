<?php

# last updated on 02/04 by mars

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAffirmationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // the fields to put into the db are made in the controller
            'file' => 'required|file|mimes:jpg,jpeg,png,gif|max:5120', // photos only!!
        ];
    }
}