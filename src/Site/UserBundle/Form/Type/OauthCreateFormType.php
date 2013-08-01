<?php
namespace Site\UserBundle\Form\Type;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
class OauthCreateFormType extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder,array $options)
	{
	    $builder
	        ->add('username', null, array(
                'label' => '用户名:', 
                'attr' => array(
                    'placeholder' => '请输入用户名'
                )
            ))
            ->add('email', 'email', array(
                'label' => '电子邮箱:',
                'attr' => array(
                    'placeholder' => '请输入邮箱地址'
                )
            ))->add('plainPassword', 'repeated', array(
                'type' => 'password',
                'invalid_message' => '两次输入密码不一致',
                'required' => true,
                'first_options'  => array('label' => '密码:','attr' => array('placeholder' => '请输入密码')),
                'second_options' =>  array('label' => '确认密码:','attr' => array('placeholder' => '请重复密码')),
            ))->add('create', 'submit',array(
                'label' => '创建账户',
                'attr' => array(
                	'class' => 'button button-rounded button-flat-primary'
                )
            ));	
	}
	public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'validation_groups' => array('SiteRegistration','Registration'),
        ));
    }
	public function getName()
    {
        return 'site_user_oauth_create';
    }
}